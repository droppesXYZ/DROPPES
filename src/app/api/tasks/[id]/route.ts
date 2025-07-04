import { NextRequest, NextResponse } from 'next/server'
import { taskService } from '@/lib/firestore'
import { Task } from '../../../../lib/types'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { isCompleted } = await request.json()
    const { id: taskId } = await params

    // Buscar a task para garantir que pertence ao usuário
    const task = await taskService.findById(taskId)
    if (!task || task.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Task não encontrada' }, { status: 404 })
    }

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