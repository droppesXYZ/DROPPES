import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { calendarService } from '@/lib/firestore'
import { CalendarEventType } from '@/lib/types'
import { createLocalStartOfDay } from '@/lib/utils'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyAuth(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId
    const eventId = resolvedParams.id

    // Buscar o evento
    const event = await calendarService.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
    }

    // Verificar se o evento pertence ao usuário
    if (event.userId !== userId) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    const updateData = await request.json()
    
    // Validar campos se fornecidos
    if (updateData.type && !Object.values(CalendarEventType).includes(updateData.type)) {
      return NextResponse.json({ error: 'Tipo de evento inválido' }, { status: 400 })
    }

    if (updateData.date && typeof updateData.date === 'string') {
      updateData.date = createLocalStartOfDay(updateData.date);
    }

    await calendarService.update(eventId, updateData)

    return NextResponse.json({ message: 'Evento atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar evento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyAuth(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId
    const eventId = resolvedParams.id

    // Buscar o evento
    const event = await calendarService.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
    }

    // Verificar se o evento pertence ao usuário
    if (event.userId !== userId) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    await calendarService.delete(eventId)

    return NextResponse.json({ message: 'Evento deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 