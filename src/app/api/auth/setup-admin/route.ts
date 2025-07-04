import { NextResponse } from 'next/server'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'
import { userService } from '@/lib/firestore'

// Lista de emails que devem ser automaticamente promovidos a admin
const ADMIN_EMAILS = [
  'brunnin.duarte100@gmail.com',
  'droppes.xyz@gmail.com'
]

export async function POST() {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError;
    }

    const userEmail = userOrError.email;
    
    // Verificar se o email está na lista de admins
    if (!ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
      return NextResponse.json(
        { error: 'Email não autorizado para configuração de admin' },
        { status: 403 }
      )
    }

    // Se já é admin, retornar sucesso
    if (userOrError.isAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Usuário já é admin',
        user: {
          id: userOrError.id,
          email: userOrError.email,
          isAdmin: userOrError.isAdmin
        }
      })
    }

    // Promover a admin
    await userService.update(userOrError.id, { isAdmin: true })
    
    console.log(`✅ Admin configurado automaticamente para: ${userEmail}`)
    
    return NextResponse.json({
      success: true,
      message: `Admin configurado automaticamente para ${userEmail}`,
      user: {
        id: userOrError.id,
        email: userOrError.email,
        isAdmin: true
      }
    })

  } catch (error) {
    console.error('Erro ao configurar admin automaticamente:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 