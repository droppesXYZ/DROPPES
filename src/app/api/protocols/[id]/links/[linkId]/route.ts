import { NextRequest, NextResponse } from 'next/server'
import { protocolLinkService, protocolService } from '@/lib/firestore'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { id: protocolId, linkId } = await params
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    const existingLink = await protocolLinkService.findById(linkId)
    if (!existingLink || existingLink.protocolId !== protocolId) {
      return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 })
    }
    const { title, url, description, amount } = await request.json()
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Título e URL são obrigatórios' },
        { status: 400 }
      )
    }
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      )
    }
    await protocolLinkService.update(linkId, {
      title,
      url,
      description: description || null,
      amount: amount || null
    })
    const updatedLink = await protocolLinkService.findById(linkId)
    return NextResponse.json(updatedLink)
  } catch (error) {
    console.error('Erro ao atualizar link:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { id: protocolId, linkId } = await params
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    const existingLink = await protocolLinkService.findById(linkId)
    if (!existingLink || existingLink.protocolId !== protocolId) {
      return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 })
    }
    await protocolLinkService.delete(linkId)
    return NextResponse.json({ message: 'Link deletado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Erro ao deletar link:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 