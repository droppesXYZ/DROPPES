import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { taskService } from '@/lib/firestore'
import { createLocalDate } from '@/lib/utils'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const protocolId = searchParams.get('protocolId')

    if (!protocolId) {
      return NextResponse.json({ error: 'Protocol ID é obrigatório' }, { status: 400 })
    }

    // Buscar tasks do protocolo
    const tasks = await taskService.findByProtocolId(protocolId)

    return NextResponse.json(tasks)

  } catch (error) {
    console.error('Erro ao buscar tasks:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { title, description, type, dueDate, protocolId } = await request.json()

    // Validação básica
    if (!title || !dueDate || !protocolId) {
      return NextResponse.json(
        { error: 'Título, data limite e protocolo são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar task
    const taskId = await taskService.create({
      title,
      description: description || null,
      isCompleted: false,
      isDaily: type === 'daily',
      dueDate: createLocalDate(dueDate),
      completedAt: null,
      userId: decoded.userId,
      protocolId
    })

    // Buscar task criada
    const newTask = await taskService.findById(taskId)

    return NextResponse.json(newTask, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar task:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 