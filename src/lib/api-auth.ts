import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, requireAuth, requireAdmin } from './auth'
import type { User } from './types'

/**
 * Helper para autenticação em APIs
 * Retorna o usuário autenticado ou null se não autenticado
 */
export async function getApiUser(request: NextRequest): Promise<User | null> {
  try {
    return await getCurrentUser(request)
  } catch {
    return null
  }
}

/**
 * Helper que requer autenticação em APIs
 * Retorna o usuário ou uma response de erro
 */
export async function requireApiAuth(request: NextRequest): Promise<User | NextResponse> {
  try {
    const user = await requireAuth(request)
    return user
  } catch (error) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }
}

/**
 * Helper que requer admin em APIs
 * Retorna o usuário admin ou uma response de erro
 */
export async function requireApiAdmin(request: NextRequest): Promise<User | NextResponse> {
  try {
    const user = await requireAdmin(request)
    return user
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Acesso negado'
    const statusCode = errorMessage === 'Unauthorized' ? 401 : 403
    
    return NextResponse.json(
      { error: errorMessage === 'Unauthorized' ? 'Não autorizado' : 'Acesso de admin necessário' },
      { status: statusCode }
    )
  }
}

/**
 * Helper para verificar se a resposta é um erro
 */
export function isErrorResponse(userOrResponse: User | NextResponse): userOrResponse is NextResponse {
  return userOrResponse instanceof NextResponse
} 