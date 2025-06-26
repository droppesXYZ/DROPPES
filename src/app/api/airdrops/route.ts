import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { airdropService } from '@/lib/firestore'
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

    // Buscar airdrops do protocolo
    const airdrops = await airdropService.findByProtocolId(protocolId)

    return NextResponse.json(airdrops)

  } catch (error) {
    console.error('Erro ao buscar airdrops:', error)
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

    const { ticker, quantity, tokenPrice, date, protocolId } = await request.json()

    // Validação básica
    if (!ticker || !quantity || !tokenPrice || !date || !protocolId) {
      return NextResponse.json(
        { error: 'Ticker, quantidade, preço, data e protocolo são obrigatórios' },
        { status: 400 }
      )
    }

    const quantityNum = parseFloat(quantity)
    const priceNum = parseFloat(tokenPrice)
    const totalValue = quantityNum * priceNum

    // Criar airdrop
    const airdropId = await airdropService.create({
      ticker,
      quantity: quantityNum,
      tokenPrice: priceNum,
      totalValue,
      date: createLocalDate(date),
      protocolId
    })

    // Buscar airdrop criado
    const newAirdrop = await airdropService.findById(airdropId)

    return NextResponse.json(newAirdrop, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar airdrop:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 