import { NextRequest, NextResponse } from 'next/server'
import { protocolLinkService, protocolService } from '@/lib/firestore'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { id: protocolId } = await params
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
    }
    const links = await protocolLinkService.findByProtocolIdAndUser(protocolId, userOrError.email)
    return NextResponse.json(links)
  } catch (error) {
    console.error('Erro ao buscar links do protocolo:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { id: protocolId } = await params
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userEmail !== userOrError.email) {
      return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
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
    const linkId = await protocolLinkService.create({
      title,
      url,
      description: description || null,
      amount: amount || null,
      protocolId,
      userEmail: userOrError.email
    })
    const newLink = await protocolLinkService.findById(linkId)
    return NextResponse.json(newLink, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar link:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 