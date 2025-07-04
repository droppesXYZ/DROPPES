import { NextRequest, NextResponse } from 'next/server'
import { taskService } from '@/lib/firestore'
import { createLocalDate } from '@/lib/utils'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { searchParams } = new URL(request.url)
    const protocolId = searchParams.get('protocolId')

    if (!protocolId) {
      return NextResponse.json({ error: 'Protocol ID é obrigatório' }, { status: 400 })
    }

    // Buscar tasks do protocolo APENAS do usuário autenticado
    const tasks = await taskService.findByProtocolIdAndUser(protocolId, userOrError.email)
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Erro ao buscar tasks:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { title, description, isDaily, dueDate, protocolId } = await request.json()

    if (!title || !protocolId) {
      return NextResponse.json(
        { error: 'Título e protocolo são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar task
    const taskId = await taskService.create({
      title,
      description: description || null,
      isCompleted: false,
      isDaily: isDaily || false,
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: null,
      userEmail: userOrError.email,
      protocolId,
    })

    const newTask = await taskService.findById(taskId)
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar task:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 