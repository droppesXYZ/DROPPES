import { NextRequest, NextResponse } from 'next/server'
import { airdropService } from '@/lib/firestore'
import { createLocalDate } from '@/lib/utils'
import { getUserOrError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const userOrError = await getUserOrError();
    if (userOrError instanceof NextResponse) return userOrError;
    const userEmail = userOrError.email;
    if (!userEmail) return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });

    const { searchParams } = new URL(request.url)
    const protocolId = searchParams.get('protocolId')
    if (!protocolId) {
      return NextResponse.json({ error: 'Protocol ID é obrigatório' }, { status: 400 })
    }
    // Buscar airdrops do protocolo APENAS do usuário autenticado
    const airdrops = await airdropService.findByProtocolIdAndUser(protocolId, userEmail)
    return NextResponse.json(airdrops)
  } catch (error) {
    console.error('Erro ao buscar airdrops:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userOrError = await getUserOrError();
    if (userOrError instanceof NextResponse) return userOrError;
    const userEmail = userOrError.email;
    if (!userEmail) return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });

    const { ticker, quantity, tokenPrice, date, protocolId } = await request.json()
    if (!ticker || !quantity || !tokenPrice || !date || !protocolId) {
      return NextResponse.json(
        { error: 'Ticker, quantidade, preço, data e protocolo são obrigatórios' },
        { status: 400 }
      )
    }
    const quantityNum = parseFloat(quantity)
    const priceNum = parseFloat(tokenPrice)
    const totalValue = quantityNum * priceNum
    const airdropId = await airdropService.create({
      ticker,
      quantity: quantityNum,
      tokenPrice: priceNum,
      totalValue,
      date: createLocalDate(date),
      protocolId,
      userEmail
    })
    const newAirdrop = await airdropService.findById(airdropId)
    return NextResponse.json(newAirdrop, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar airdrop:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 