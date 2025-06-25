import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { protocolLinkService, protocolService } from '@/lib/firestore'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { id: protocolId, linkId } = await params

    // Verificar se o protocolo existe e pertence ao usuário
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userId !== decoded.userId) {
      return NextResponse.json({ 
        error: 'Protocolo não encontrado' 
      }, { status: 404 })
    }

    // Verificar se o link existe e pertence ao protocolo
    const existingLink = await protocolLinkService.findById(linkId)
    if (!existingLink || existingLink.protocolId !== protocolId) {
      return NextResponse.json({ 
        error: 'Link não encontrado' 
      }, { status: 404 })
    }

    const { title, url, description, amount } = await request.json()

    // Validação básica
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Título e URL são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar se a URL é válida
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      )
    }

    // Atualizar link
    await protocolLinkService.update(linkId, {
      title,
      url,
      description: description || null,
      amount: amount || null
    })

    // Buscar link atualizado
    const updatedLink = await protocolLinkService.findById(linkId)

    return NextResponse.json(updatedLink)

  } catch (error) {
    console.error('Erro ao atualizar link:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { id: protocolId, linkId } = await params

    // Verificar se o protocolo existe e pertence ao usuário
    const protocol = await protocolService.findById(protocolId)
    if (!protocol || protocol.userId !== decoded.userId) {
      return NextResponse.json({ 
        error: 'Protocolo não encontrado' 
      }, { status: 404 })
    }

    // Verificar se o link existe e pertence ao protocolo
    const existingLink = await protocolLinkService.findById(linkId)
    if (!existingLink || existingLink.protocolId !== protocolId) {
      return NextResponse.json({ 
        error: 'Link não encontrado' 
      }, { status: 404 })
    }

    // Deletar link
    await protocolLinkService.delete(linkId)

    return NextResponse.json({ 
      message: 'Link deletado com sucesso' 
    }, { status: 200 })

  } catch (error) {
    console.error('Erro ao deletar link:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 