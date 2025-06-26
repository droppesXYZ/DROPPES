import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { protocolService, investmentService, taskService } from '@/lib/firestore'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.id

    // Buscar protocolos do usuário
    const protocols = await protocolService.findByUserId(userId)

    // Buscar investimentos e tarefas para cada protocolo
    const protocolsWithData = await Promise.all(protocols.map(async (protocol) => {
      const investments = await investmentService.findByProtocolId(protocol.id)
      const tasks = await taskService.findByProtocolId(protocol.id)
      
      // Calcular total investido
      const totalInvested = investments.reduce((sum, investment) => {
        return sum + (investment.type === 'DEPOSIT' ? investment.amount : -investment.amount)
      }, 0)

      return {
        ...protocol,
        totalInvested,
        pendingTasks: tasks.filter(task => !task.isCompleted).length
      }
    }))

    // Buscar todas as tarefas do usuário para estatísticas
    const allTasks = await taskService.findByUserId(userId)

    // Calcular estatísticas
    const totalProtocols = protocols.length
    const totalInvested = protocolsWithData.reduce((sum, protocol) => sum + protocol.totalInvested, 0)
    const pendingTasks = allTasks.filter(task => !task.isCompleted).length
    const completedTasksThisMonth = allTasks.filter(task => {
      if (!task.completedAt) return false
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return task.completedAt >= startOfMonth && task.isCompleted
    }).length

    const stats = {
      totalProtocols,
      totalInvested,
      pendingTasks,
      completedTasks: completedTasksThisMonth
    }

    return NextResponse.json({
      protocols: protocolsWithData,
      stats
    })

  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 