import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { taskService } from '@/lib/firestore'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId

    // Limpar tasks órfãs
    const deletedCount = await taskService.cleanOrphanTasks(userId)

    return NextResponse.json({
      message: `${deletedCount} tasks órfãs foram removidas com sucesso`,
      deletedCount
    })

  } catch (error) {
    console.error('Erro ao limpar tasks órfãs:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 