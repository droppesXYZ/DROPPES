'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAuthStore, useUIStore } from '@/lib/store'
import { CalendarEvent, CalendarEventType, Protocol } from '@/lib/types'
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Target,
  Coins,
  Rocket,
  Bell,
  Trash2,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

const EVENT_TYPE_CONFIG = {
  [CalendarEventType.ALLOCATION_CHECK]: {
    label: 'Check Alocação',
    icon: Target,
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50'
  },
  [CalendarEventType.TOKEN_CLAIM]: {
    label: 'Claim Tokens',
    icon: Coins,
    color: 'bg-green-500',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50'
  },
  [CalendarEventType.TGE]: {
    label: 'TGE',
    icon: Rocket,
    color: 'bg-purple-500',
    textColor: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50'
  },
  [CalendarEventType.TASK_REMINDER]: {
    label: 'Lembrete Task',
    icon: Bell,
    color: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/50'
  },
  [CalendarEventType.CUSTOM]: {
    label: 'Personalizado',
    icon: Calendar,
    color: 'bg-gray-500',
    textColor: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600/50'
  }
}

export default function CalendarPage() {
  const { isAuthenticated } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    type: CalendarEventType.ALLOCATION_CHECK,
    protocolId: '',
    reminderEnabled: false,
    reminderDays: 1
  })

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  const fetchEvents = useCallback(async () => {
    try {
      const token = getCookie('token')
      const response = await fetch('/api/calendar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error)
    }
  }, [])

  const fetchProtocols = useCallback(async () => {
    try {
      const token = getCookie('token')
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProtocols(data.protocols || [])
      }
    } catch (error) {
      console.error('Erro ao buscar protocolos:', error)
    }
  }, [])

  // Função para normalizar datas para comparação (remove horário)
  const normalizeDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  const generateCalendarDays = useCallback(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    
    const days: CalendarDay[] = []
    const today = new Date()
    
    // Dias do mês anterior
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: events.filter(event => {
          const eventDate = normalizeDate(event.date)
          const calendarDate = normalizeDate(date)
          return eventDate.getTime() === calendarDate.getTime()
        })
      })
    }
    
    // Dias do mês atual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        events: events.filter(event => {
          const eventDate = normalizeDate(event.date)
          const calendarDate = normalizeDate(date)
          return eventDate.getTime() === calendarDate.getTime()
        })
      })
    }
    
    // Dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: events.filter(event => {
          const eventDate = normalizeDate(event.date)
          const calendarDate = normalizeDate(date)
          return eventDate.getTime() === calendarDate.getTime()
        })
      })
    }
    
    setCalendarDays(days)
  }, [currentDate, events])

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents()
      fetchProtocols()
    }
  }, [isAuthenticated, fetchEvents, fetchProtocols])

  useEffect(() => {
    generateCalendarDays()
  }, [generateCalendarDays])

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!eventForm.title || !eventForm.date || !eventForm.type) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    setLoading(true)
    clearError()

    try {
      const token = getCookie('token')
      const url = isEditMode ? `/api/calendar/${selectedEvent?.id}` : '/api/calendar'
      const method = isEditMode ? 'PATCH' : 'POST'
      
      const requestData = {
        ...eventForm,
        protocolId: eventForm.protocolId || null
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        await fetchEvents()
        handleCloseDialog()
      } else {
        const responseData = await response.json()
        setError(responseData.error || 'Erro ao salvar evento')
      }
    } catch (error) {
      console.error('Erro ao salvar evento:', error)
      setError('Erro ao salvar evento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    setLoading(true)

    try {
      const token = getCookie('token')
      const response = await fetch(`/api/calendar/${selectedEvent.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchEvents()
        handleCloseDialog()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao deletar evento')
      }
    } catch (error) {
      console.error('Erro ao deletar evento:', error)
      setError('Erro ao deletar evento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleEventComplete = async (event: CalendarEvent) => {
    try {
      const token = getCookie('token')
      const response = await fetch(`/api/calendar/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isCompleted: !event.isCompleted
        })
      })

      if (response.ok) {
        await fetchEvents()
      }
    } catch (error) {
      console.error('Erro ao atualizar evento:', error)
    }
  }

  const handleCloseDialog = () => {
    setIsEventDialogOpen(false)
    setIsEditMode(false)
    setSelectedEvent(null)
    setEventForm({
      title: '',
      description: '',
      date: '',
      type: CalendarEventType.ALLOCATION_CHECK,
      protocolId: '',
      reminderEnabled: false,
      reminderDays: 1
    })
    clearError()
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEditMode(true)
    const eventDate = new Date(event.date)
    setEventForm({
      title: event.title,
      description: event.description || '',
      date: `${eventDate.getUTCFullYear()}-${String(eventDate.getUTCMonth() + 1).padStart(2, '0')}-${String(eventDate.getUTCDate()).padStart(2, '0')}`,
      type: event.type,
      protocolId: event.protocolId || '',
      reminderEnabled: event.reminderEnabled,
      reminderDays: event.reminderDays || 1
    })
    setIsEventDialogOpen(true)
  }

  const handleNewEvent = (date?: Date) => {
    setIsEditMode(false)
    setSelectedEvent(null)
    setEventForm({
      title: '',
      description: '',
      date: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '',
      type: CalendarEventType.ALLOCATION_CHECK,
      protocolId: '',
      reminderEnabled: false,
      reminderDays: 1
    })
    setIsEventDialogOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Calendar className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Faça login para acessar seu calendário de farming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const upcomingEvents = events
    .filter(event => {
      if (event.isCompleted) return false
      const eventDate = normalizeDate(event.date)
      const today = normalizeDate(new Date())
      return eventDate.getTime() >= today.getTime()
    })
    .sort((a, b) => normalizeDate(a.date).getTime() - normalizeDate(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={() => handleNewEvent()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Calendário de Farming
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize suas datas importantes: TGEs, claims e check-ins
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendário Principal */}
          <div className="lg:col-span-3">
            <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl dark:text-white">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Cabeçalho dos dias da semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Grade do calendário */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        day.isCurrentMonth 
                          ? 'bg-white dark:bg-gray-800/30 border-gray-200 dark:border-gray-600/50' 
                          : 'bg-gray-50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700/30'
                      } ${
                        day.isToday ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => handleNewEvent(day.date)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        day.isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
                      } ${
                        day.isToday ? 'text-blue-600 dark:text-blue-400' : ''
                      }`}>
                        {day.date.getDate()}
                      </div>
                      
                      {/* Eventos do dia */}
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map((event) => {
                          const config = EVENT_TYPE_CONFIG[event.type]
                          const Icon = config.icon
                          
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded border flex items-center gap-1 ${config.bgColor} ${config.textColor} cursor-pointer hover:opacity-80 transition-opacity`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEvent(event)
                              }}
                            >
                              <Icon className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{event.title}</span>
                              {event.isCompleted && (
                                <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                              )}
                            </div>
                          )
                        })}
                        {day.events.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                            +{day.events.length - 2} mais
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com próximos eventos */}
          <div className="space-y-6">
            {/* Próximos Eventos */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => {
                      const config = EVENT_TYPE_CONFIG[event.type]
                      const Icon = config.icon
                      const eventDate = normalizeDate(event.date)
                      const today = normalizeDate(new Date())
                      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                      
                      return (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border ${config.bgColor} cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-all`}
                          onClick={() => handleEditEvent(event)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate dark:text-gray-100">{event.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {new Date(event.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                              </p>
                              {event.protocol && (
                                <Badge variant="secondary" className="mt-1 text-xs truncate max-w-full dark:bg-gray-700/50 dark:text-gray-300">
                                  {event.protocol.name}
                                </Badge>
                              )}
                              <div className="flex items-center gap-1 mt-2">
                                {daysUntil === 0 ? (
                                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">Hoje!</span>
                                ) : daysUntil === 1 ? (
                                  <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Amanhã</span>
                                ) : (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Em {daysUntil} dias</span>
                                )}
                                {event.reminderEnabled && (
                                  <Bell className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhum evento próximo</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => handleNewEvent()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Evento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total de Eventos</span>
                    <span className="font-bold dark:text-white">{events.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Concluídos</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {events.filter(e => e.isCompleted).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pendentes</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {events.filter(e => !e.isCompleted).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog para criar/editar evento */}
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                {isEditMode ? 'Editar Evento' : 'Novo Evento'}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {isEditMode ? 'Atualize as informações do evento' : 'Crie um novo evento para seu calendário'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="dark:text-gray-200">Título *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Check alocação Arbitrum"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  required
                  className="dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="dark:text-gray-200">Tipo de Evento *</Label>
                <select
                  id="type"
                  value={eventForm.type}
                  onChange={(e) => setEventForm({...eventForm, type: e.target.value as CalendarEventType})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                >
                  {Object.entries(EVENT_TYPE_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="dark:text-gray-200">Data *</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  required
                  className="dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="protocol" className="dark:text-gray-200">Protocolo (Opcional)</Label>
                <select
                  id="protocol"
                  value={eventForm.protocolId}
                  onChange={(e) => setEventForm({...eventForm, protocolId: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm truncate dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Selecione um protocolo...</option>
                  {protocols.map((protocol) => (
                    <option key={protocol.id} value={protocol.id} className="truncate">
                      {protocol.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="dark:text-gray-200">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Detalhes adicionais sobre o evento..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  rows={3}
                  className="resize-none dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={eventForm.reminderEnabled}
                  onChange={(e) => setEventForm({...eventForm, reminderEnabled: e.target.checked})}
                  className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <Label htmlFor="reminder" className="dark:text-gray-200">Ativar lembrete</Label>
              </div>

              {eventForm.reminderEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="reminderDays" className="dark:text-gray-200">Lembrar com quantos dias de antecedência?</Label>
                  <Input
                    id="reminderDays"
                    type="number"
                    min="1"
                    max="30"
                    value={eventForm.reminderDays}
                    onChange={(e) => setEventForm({...eventForm, reminderDays: parseInt(e.target.value)})}
                    className="dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}

              {error && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md dark:border dark:border-red-700/50">
                  {error}
                </div>
              )}

              <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                {isEditMode && (
                  <div className="flex flex-col gap-2 sm:flex-row w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleToggleEventComplete(selectedEvent!)}
                      disabled={isLoading}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      {selectedEvent?.isCompleted ? (
                        <>
                          <AlertCircle className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="truncate">Marcar Pendente</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="truncate">Marcar Concluído</span>
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDeleteEvent}
                      disabled={isLoading}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="truncate">Deletar</span>
                    </Button>
                  </div>
                )}
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none text-xs sm:text-sm"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 sm:flex-none text-xs sm:text-sm"
                  >
                    <span className="truncate">
                      {isLoading ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Criar Evento'}
                    </span>
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 