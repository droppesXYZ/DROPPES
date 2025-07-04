import { NextRequest, NextResponse } from 'next/server'
import { protocolService, taskService, investmentService, airdropService, protocolLinkService } from '@/lib/firestore'
import { Protocol } from '../../../../lib/types'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const body = await request.json()
    const { name, network, officialUrl, twitterHandle } = body
    if (!name || !network || !officialUrl) {
      return NextResponse.json({ error: 'Nome, rede e URL oficial são obrigatórios' }, { status: 400 })
    }
    const { id: protocolId } = await params
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    await protocolService.update(protocolId, {
      name,
      network,
      officialUrl,
      twitterHandle
    })
    const updatedProtocol = await protocolService.findById(protocolId)
    return NextResponse.json(updatedProtocol, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar protocolo:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { id: protocolId } = await params
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    await Promise.all([
      taskService.deleteByProtocolId(protocolId),
      investmentService.deleteByProtocolId(protocolId),
      airdropService.deleteByProtocolId(protocolId),
      protocolLinkService.deleteByProtocolId(protocolId)
    ])
    await protocolService.delete(protocolId)
    return NextResponse.json({ message: 'Protocolo e todas as entidades relacionadas foram deletados com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Erro ao deletar protocolo:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const body = await request.json()
    const { primaryColor, textColor, logoUrl, officialUrl } = body
    const { id: protocolId } = await params
    const existingProtocol = await protocolService.findById(protocolId)
    if (!existingProtocol || existingProtocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    const updateData: Partial<Protocol> = {}
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor
    if (textColor !== undefined) updateData.textColor = textColor
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl
    if (officialUrl !== undefined) updateData.officialUrl = officialUrl
    await protocolService.update(protocolId, updateData)
    const updatedProtocol = await protocolService.findById(protocolId)
    return NextResponse.json(updatedProtocol, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar protocolo:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 