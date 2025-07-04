import { NextResponse } from 'next/server'
import type { User } from './types'
import { stackServerApp } from "@/stack"
import { userService } from './firestore'

// Lista de emails que têm acesso administrativo
const ADMIN_EMAILS = [
  'brunnin.duarte100@gmail.com',
  'droppes.xyz@gmail.com'
]

/**
 * Helper para autenticação em APIs - Sistema unificado
 * Retorna o usuário autenticado ou null se não autenticado
 * @deprecated Use getAuthenticatedUser() instead
 */
export async function getApiUser(): Promise<User | null> {
  try {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) return null;
    
    const localUser = await getLocalUserOrCreate(stackUser);
    return localUser;
  } catch {
    return null
  }
}

/**
 * Helper que requer autenticação em APIs
 * Retorna o usuário ou uma response de erro
 * @deprecated Use requireAuthenticatedUser() instead
 */
export async function requireApiAuth(): Promise<User | NextResponse> {
  const user = await getApiUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }
  return user;
}

/**
 * Helper que requer admin em APIs
 * Retorna o usuário admin ou uma response de erro
 * @deprecated Use requireAuthenticatedAdmin() instead
 */
export async function requireApiAdmin(): Promise<User | NextResponse> {
  const user = await getApiUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }
  
  if (!user.isAdmin) {
    return NextResponse.json(
      { error: 'Acesso de admin necessário' },
      { status: 403 }
    )
  }
  
  return user;
}

/**
 * Helper para verificar se a resposta é um erro
 */
export function isErrorResponse(userOrResponse: User | NextResponse): userOrResponse is NextResponse {
  return userOrResponse instanceof NextResponse
}

/**
 * Obtém o usuário autenticado pelo Stack Auth e sincroniza com o usuário local.
 * Ideal para ser usado no início das rotas de API.
 * Retorna o usuário local completo ou uma resposta de erro.
 */
export async function getUserOrError() {
  return getAuthenticatedUser();
}

/**
 * Obtém o usuário local do Firestore baseado no email do Stack Auth
 * Se o usuário não existir, cria um novo com permissões de admin se o email estiver na lista
 */
export async function getLocalUserOrCreate(stackUser: { primaryEmail?: string | null, displayName?: string | null }): Promise<User | null> {
  try {
    const userEmail = stackUser.primaryEmail;
    if (!userEmail) return null;

    // Buscar usuário existente
    let localUser = await userService.findByEmail(userEmail);
    
    if (!localUser) {
      // Criar novo usuário se não existir
      const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());
      
      const newUserData = {
        email: userEmail.toLowerCase(),
        password: '', // Não necessário com Stack Auth
        name: stackUser.displayName || null,
        isPremium: false,
        premiumUntil: null,
        isAdmin: isAdmin,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const userId = await userService.create(newUserData);
      localUser = await userService.findById(userId);
      
      console.log(`✅ Novo usuário criado: ${userEmail} (Admin: ${isAdmin})`);
    } else {
      // Verificar se o usuário existente deve ser admin
      const shouldBeAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());
      if (shouldBeAdmin && !localUser.isAdmin) {
        await userService.update(localUser.id, { isAdmin: true });
        localUser.isAdmin = true;
        console.log(`✅ Usuário promovido a admin: ${userEmail}`);
      }
    }

    return localUser;
  } catch (error) {
    console.error('Erro ao obter/criar usuário local:', error);
    return null;
  }
}

/**
 * Helper unificado que obtém o usuário Stack Auth e sincroniza com o usuário local
 */
export async function getAuthenticatedUser(): Promise<User | NextResponse> {
  try {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const localUser = await getLocalUserOrCreate(stackUser);
    if (!localUser) {
      return new NextResponse(
        JSON.stringify({ error: "Erro ao sincronizar usuário" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return localUser;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Helper que requer autenticação e retorna o usuário local
 */
export async function requireAuthenticatedUser(): Promise<User | NextResponse> {
  const userOrResponse = await getAuthenticatedUser();
  if (isErrorResponse(userOrResponse)) {
    return userOrResponse;
  }
  return userOrResponse;
}

/**
 * Helper que requer admin e retorna o usuário local
 */
export async function requireAuthenticatedAdmin(): Promise<User | NextResponse> {
  const userOrResponse = await getAuthenticatedUser();
  if (isErrorResponse(userOrResponse)) {
    return userOrResponse;
  }

  if (!userOrResponse.isAdmin) {
    return new NextResponse(
      JSON.stringify({ error: "Acesso de administrador necessário" }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return userOrResponse;
} 