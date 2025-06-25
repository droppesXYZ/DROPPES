import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { protocolService } from '@/lib/firestore'
import { FREE_PROTOCOL_LIMIT } from '@/lib/constants'
import { isUserPremium } from '@/lib/auth'
import { userService } from '@/lib/firestore'

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

    const userId = decoded.userId

    // Buscar protocolos do usuário
    const protocols = await protocolService.findByUserId(userId)

    return NextResponse.json(protocols)

  } catch (error) {
    console.error('Erro ao buscar protocolos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    console.log('=== DEBUG TOKEN ===')
    console.log('Token recebido:', token ? 'SIM' : 'NÃO')
    console.log('Tamanho do token:', token?.length || 0)
    console.log('Primeiros 50 chars:', token?.substring(0, 50))
    console.log('JWT_SECRET existe:', !!JWT_SECRET)
    console.log('JWT_SECRET length:', JWT_SECRET?.length || 0)
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    console.log('Token decodificado:', decoded ? 'SIM' : 'NÃO')
    
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const userId = decoded.userId
    console.log('UserId extraído:', userId)

    // Buscar dados do usuário para verificar se é premium
    const user = await userService.findById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Verificar limite de protocolos para usuários não premium
    if (!isUserPremium(user)) {
      const existingProtocols = await protocolService.findByUserId(userId)
      if (existingProtocols.length >= FREE_PROTOCOL_LIMIT) {
        return NextResponse.json(
          { error: 'Limite de protocolos atingido. Faça upgrade para Premium.' },
          { status: 403 }
        )
      }
    }

    const { name, network, officialUrl, twitterHandle, dailyMissions, totalInvested, isActive } = await request.json()

    // Validação básica
    if (!name || !network || !officialUrl) {
      return NextResponse.json(
        { error: 'Nome, rede e URL oficial são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar protocolo
    const protocolId = await protocolService.create({
      name,
      network,
      officialUrl,
      twitterHandle: twitterHandle || null,
      farmStartDate: null,
      dailyMissions: dailyMissions || false,
      logoUrl: null,
      primaryColor: null,
      totalInvested: totalInvested || 0,
      isActive: isActive !== undefined ? isActive : true,
      userId
    })

    // Buscar protocolo criado
    const newProtocol = await protocolService.findById(protocolId)

    return NextResponse.json(newProtocol, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar protocolo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 