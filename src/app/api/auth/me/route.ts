import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { userService } from '@/lib/firestore'

export const GET = async (req: Request) => {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const verifiedToken = await verifyAuth(token)

    if (!verifiedToken || !verifiedToken.userId) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const user = await userService.findById(verifiedToken.userId)

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 