import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { protocolService, taskService, investmentService, airdropService, protocolLinkService } from '@/lib/firestore'
import { Protocol } from '../../../../lib/types'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const body = await request.json()
    const { name, network, officialUrl, twitterHandle } = body

    if (!name || !network || !officialUrl) {
      return NextResponse.json({ 
        error: 'Nome, rede e URL oficial são obrigatórios' 
      }, { status: 400 })
    }

    const { id: protocolId } = await params

    // Verificar se o protocolo existe e pertence ao usuário
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userId !== decoded.userId) {
      return NextResponse.json({ 
        error: 'Protocolo não encontrado' 
      }, { status: 404 })
    }

    // Atualizar protocolo
    await protocolService.update(protocolId, {
      name,
      network,
      officialUrl,
      twitterHandle
    })

    // Buscar protocolo atualizado
    const updatedProtocol = await protocolService.findById(protocolId)

    return NextResponse.json(updatedProtocol, { status: 200 })

  } catch (error) {
    console.error('Erro ao atualizar protocolo:', error)
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const { id: protocolId } = await params

    // Verificar se o protocolo existe e pertence ao usuário
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userId !== decoded.userId) {
      return NextResponse.json({ 
        error: 'Protocolo não encontrado' 
      }, { status: 404 })
    }

    // Deletar todas as entidades relacionadas primeiro
    await Promise.all([
      taskService.deleteByProtocolId(protocolId),
      investmentService.deleteByProtocolId(protocolId),
      airdropService.deleteByProtocolId(protocolId),
      protocolLinkService.deleteByProtocolId(protocolId)
    ])

    // Depois deletar o protocolo
    await protocolService.delete(protocolId)

    return NextResponse.json({ 
      message: 'Protocolo e todas as entidades relacionadas foram deletados com sucesso' 
    }, { status: 200 })

  } catch (error) {
    console.error('Erro ao deletar protocolo:', error)
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const body = await request.json()
    const { primaryColor, textColor, logoUrl, officialUrl } = body

    const { id: protocolId } = await params

    // Verificar se o protocolo existe e pertence ao usuário
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userId !== decoded.userId) {
      return NextResponse.json({ 
        error: 'Protocolo não encontrado' 
      }, { status: 404 })
    }

    // Atualizar apenas os campos fornecidos
    const updateData: Partial<Protocol> = {}
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor
    if (textColor !== undefined) updateData.textColor = textColor
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl
    if (officialUrl !== undefined) updateData.officialUrl = officialUrl

    await protocolService.update(protocolId, updateData)

    // Buscar protocolo atualizado
    const updatedProtocol = await protocolService.findById(protocolId)

    return NextResponse.json(updatedProtocol, { status: 200 })

  } catch (error) {
    console.error('Erro ao atualizar protocolo:', error)
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
} 