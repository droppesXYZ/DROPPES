import { NextResponse } from 'next/server'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'
import { protocolService, taskService, investmentService, airdropService } from '@/lib/firestore'

export async function GET() {
  try {
    const userOrError = await requireAuthenticatedUser()
    if (isErrorResponse(userOrError)) {
      return userOrError
    }

    const protocols = await protocolService.findByUserEmail(userOrError.email)
    const protocolIds = protocols.map(p => p.id)

    const [
      totalInvested,
      pendingTasksCount,
      completedTasksCount,
      activeProtocolsCount
    ] = await Promise.all([
      protocolService.getTotalInvestedByUser(userOrError.email),
      taskService.getTasksCount(protocolIds, false),
      taskService.getTasksCount(protocolIds, true),
      protocolService.getActiveProtocolsCount(userOrError.email),
    ]);

    // Para cada protocolo, calcular o totalInvested do usuário autenticado
    const protocolsWithInvested = await Promise.all(protocols.map(async (protocol) => {
      const investments = await investmentService.findByProtocolIdAndUser(protocol.id, userOrError.email)
      const totalInvested = investments.reduce((sum, investment) => {
        return sum + (investment.type === 'DEPOSIT' ? investment.amount : -investment.amount)
      }, 0)
      return { ...protocol, totalInvested }
    }))

    // Calcular totais diretamente dos protocolos já filtrados
    const totalInvestedDirect = protocolsWithInvested.reduce((sum, p) => sum + (p.totalInvested || 0), 0)
    const totalProtocols = protocolsWithInvested.length

    // Buscar todos os airdrops do usuário
    const userAirdrops = await airdropService.findByUserEmail(userOrError.email);
    const airdropsTotal = userAirdrops.reduce((sum, a) => sum + (a.totalValue || 0), 0);

    return NextResponse.json({
      protocols: protocolsWithInvested,
      stats: {
        totalInvested,
        totalProtocols,
        pendingTasks: pendingTasksCount,
        airdropsTotal
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 