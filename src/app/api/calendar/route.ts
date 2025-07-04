import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'
import { calendarEventService, protocolService } from '@/lib/firestore'
import { CalendarEventType } from '@/lib/types'
import { createLocalDate } from '@/lib/utils'

export async function GET() {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const events = await calendarEventService.findByUserEmail(userOrError.email)
    return NextResponse.json(events)
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError;
    }

    const { title, description, date, type, protocolId, reminderEnabled, reminderDays } = await request.json();

    if (!title || !date || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios: title, date, type' }, { status: 400 });
    }
    if (!Object.values(CalendarEventType).includes(type)) {
      return NextResponse.json({ error: 'Tipo de evento inválido' }, { status: 400 });
    }

    if (protocolId) {
      const protocol = await protocolService.findById(protocolId);
      if (!protocol || protocol.userEmail !== userOrError.email) {
        return NextResponse.json({ error: 'Protocolo não encontrado ou não pertence ao usuário' }, { status: 404 });
      }
    }

    const eventId = await calendarEventService.create({
      title,
      description: description || null,
      date: createLocalDate(date),
      type: type as CalendarEventType,
      protocolId: protocolId || null,
      isCompleted: false,
      reminderEnabled: reminderEnabled || false,
      reminderDays: reminderDays || null,
      userEmail: userOrError.email,
    });

    return NextResponse.json({ id: eventId, message: 'Evento criado com sucesso' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 