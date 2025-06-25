import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { investmentService } from '@/lib/firestore'
import { InvestmentType } from '@/lib/types'
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

    // Buscar investimentos do protocolo
    const investments = await investmentService.findByProtocolId(protocolId)

    return NextResponse.json(investments)

  } catch (error) {
    console.error('Erro ao buscar investimentos:', error)
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

    const { type, amount, date, description, protocolId } = await request.json()

    // Validação básica
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
      protocolId
    })

    // Buscar investimento criado
    const newInvestment = await investmentService.findById(investmentId)

    return NextResponse.json(newInvestment, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar investimento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 