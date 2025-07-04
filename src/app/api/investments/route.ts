import { NextRequest, NextResponse } from 'next/server'
import { investmentService } from '@/lib/firestore'
import { InvestmentType } from '@/lib/types'
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

    // Buscar investimentos do protocolo APENAS do usuário autenticado
    const investments = await investmentService.findByProtocolIdAndUser(protocolId, userOrError.email)
    return NextResponse.json(investments)
  } catch (error) {
    console.error('Erro ao buscar investimentos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { type, amount, date, description, protocolId } = await request.json()

    if (!type || !amount || !date || !protocolId) {
      return NextResponse.json(
        { error: 'Tipo, valor, data e protocolo são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar investimento
    const investmentId = await investmentService.create({
      type: type === 'deposit' ? InvestmentType.DEPOSIT : InvestmentType.WITHDRAW,
      amount: parseFloat(amount),
      date: createLocalDate(date),
      description: description || null,
      protocolId,
      userEmail: userOrError.email // Salva o email do usuário
    })

    const newInvestment = await investmentService.findById(investmentId)
    return NextResponse.json(newInvestment, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar investimento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 