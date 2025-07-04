import { NextRequest, NextResponse } from 'next/server'
import { calendarService } from '@/lib/firestore'
import { CalendarEventType } from '@/lib/types'
import { createLocalStartOfDay } from '@/lib/utils'
import { getUserOrError } from '@/lib/api-auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await getUserOrError();
    if (userOrError instanceof NextResponse) return userOrError;
    const userEmail = userOrError.primaryEmail;
    if (!userEmail) return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
    const resolvedParams = await params
    const eventId = resolvedParams.id
    const event = await calendarService.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
    }
    if (event.userId !== userEmail) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }
    const updateData = await request.json()
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
    const userOrError = await getUserOrError();
    if (userOrError instanceof NextResponse) return userOrError;
    const userEmail = userOrError.primaryEmail;
    if (!userEmail) return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
    const resolvedParams = await params
    const eventId = resolvedParams.id
    const event = await calendarService.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
    }
    if (event.userId !== userEmail) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }
    await calendarService.delete(eventId)
    return NextResponse.json({ message: 'Evento deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 