import { NextResponse } from 'next/server'
import { getAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function GET() {
  try {
    const userOrError = await getAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError;
    }

    if (userOrError instanceof NextResponse) return userOrError;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userOrError;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 