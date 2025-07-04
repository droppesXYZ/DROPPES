import { NextRequest, NextResponse } from 'next/server'
import { requireApiAdmin, isErrorResponse } from '@/lib/api-auth'
import { affiliateCodeService } from '@/lib/firestore'

interface AffiliateCodeUpdateData {
  code?: string
  influencerName: string
  influencerEmail?: string | null
  isActive?: boolean
}

// GET /api/affiliate-codes/[id] - Buscar código específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrResponse = await requireApiAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }

    const { id } = await params
    const code = await affiliateCodeService.findById(id)
    
    if (!code) {
      return NextResponse.json(
        { error: 'Código não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(code)
  } catch (error) {
    console.error('Erro ao buscar código de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/affiliate-codes/[id] - Atualizar código
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrResponse = await requireApiAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }

    const { id } = await params
    const requestData = await request.json() as AffiliateCodeUpdateData
    const { code, influencerName, influencerEmail, isActive } = requestData

    // Validações
    if (!influencerName) {
      return NextResponse.json(
        { error: 'Nome do influenciador é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o código existe
    const existingCode = await affiliateCodeService.findById(id)
    if (!existingCode) {
      return NextResponse.json(
        { error: 'Código não encontrado' },
        { status: 404 }
      )
    }

    // Se o código foi alterado, verificar se não existe outro com o mesmo nome
    if (code && code.toUpperCase() !== existingCode.code) {
      const duplicateCode = await affiliateCodeService.findByCode(code)
      if (duplicateCode) {
        return NextResponse.json(
          { error: 'Este código já existe' },
          { status: 409 }
        )
      }
    }

    // Atualizar o código
    await affiliateCodeService.update(id, {
      code: code ? code.toUpperCase() : existingCode.code,
      influencerName,
      influencerEmail: influencerEmail || null,
      isActive: isActive !== undefined ? isActive : existingCode.isActive
    })

    // Buscar o código atualizado
    const updatedCode = await affiliateCodeService.findById(id)

    return NextResponse.json(updatedCode)
  } catch (error) {
    console.error('Erro ao atualizar código de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/affiliate-codes/[id] - Excluir código
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userOrResponse = await requireApiAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }
    
    const { id } = await params

    // Verificar se o código existe
    const existingCode = await affiliateCodeService.findById(id)
    if (!existingCode) {
      return NextResponse.json(
        { error: 'Código não encontrado' },
        { status: 404 }
      )
    }

    // Excluir o código
    await affiliateCodeService.delete(id)

    return NextResponse.json({ message: 'Código excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir código de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 