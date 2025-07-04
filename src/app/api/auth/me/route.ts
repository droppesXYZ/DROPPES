import { NextResponse } from 'next/server'
import { getAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export const GET = async (req: Request) => {
  try {
    const userOrError = await getAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError;
    }

    // Remover senha do objeto retornado
    const { password: _, ...userWithoutPassword } = userOrError;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 