import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { taskService } from '@/lib/firestore'
import { Task } from '../../../../lib/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { isCompleted } = await request.json()
    const { id: taskId } = await params

    // Atualizar task
    const updateData: Partial<Task> = {
      isCompleted,
      updatedAt: new Date()
    }

    // Se está marcando como concluída, adicionar data de conclusão
    if (isCompleted) {
      updateData.completedAt = new Date()
    } else {
      updateData.completedAt = null
    }

    await taskService.update(taskId, updateData)

    // Buscar task atualizada
    const updatedTask = await taskService.findById(taskId)

    return NextResponse.json(updatedTask)

  } catch (error) {
    console.error('Erro ao atualizar task:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 