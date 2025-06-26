import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { calendarService, protocolService } from '@/lib/firestore'
import { CalendarEventType } from '@/lib/types'
import { createLocalStartOfDay } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyAuth(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let events
    if (startDate && endDate) {
      events = await calendarService.findByUserIdAndDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      )
    } else {
      events = await calendarService.findByUserId(userId)
    }

    // Buscar protocolos para cada evento
    const eventsWithProtocols = await Promise.all(
      events.map(async (event) => {
        if (event.protocolId) {
          const protocol = await protocolService.findById(event.protocolId)
          return { ...event, protocol }
        }
        return event
      })
    )

    return NextResponse.json({ events: eventsWithProtocols })
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyAuth(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId
    const { title, description, date, type, protocolId, reminderEnabled, reminderDays } = await request.json()

    if (!title || !date || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios: title, date, type' }, { status: 400 })
    }

    // Validar tipo do evento
    if (!Object.values(CalendarEventType).includes(type)) {
      return NextResponse.json({ error: 'Tipo de evento inválido' }, { status: 400 })
    }

    // Validar se o protocolo existe (se fornecido)
    if (protocolId) {
      const protocol = await protocolService.findById(protocolId)
      if (!protocol || protocol.userId !== userId) {
        return NextResponse.json({ error: 'Protocolo não encontrado ou não pertence ao usuário' }, { status: 404 })
      }
    }

    const eventId = await calendarService.create({
      title,
      description: description || null,
      date: createLocalStartOfDay(date),
      type,
      protocolId: protocolId || null,
      isCompleted: false,
      reminderEnabled: reminderEnabled || false,
      reminderDays: reminderDays || null,
      userId
    })

    return NextResponse.json({ id: eventId, message: 'Evento criado com sucesso' }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 