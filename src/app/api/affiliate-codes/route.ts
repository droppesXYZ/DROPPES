import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedAdmin, isErrorResponse } from '@/lib/api-auth'
import { affiliateCodeService } from '@/lib/firestore'

// GET /api/affiliate-codes - Listar todos os códigos de afiliado (apenas admin)
export async function GET(request: NextRequest) {
  try {
    const userOrResponse = await requireAuthenticatedAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }

    const codes = await affiliateCodeService.findAll()
    return NextResponse.json(codes)
  } catch (error) {
    console.error('Erro ao buscar códigos de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/affiliate-codes - Criar novo código de afiliado (apenas admin)
export async function POST(request: NextRequest) {
  try {
    const userOrResponse = await requireAuthenticatedAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }

    const { code, influencerName, influencerEmail } = await request.json()

    // Validações
    if (!code || !influencerName) {
      return NextResponse.json(
        { error: 'Código e nome do influenciador são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o código já existe
    const existingCode = await affiliateCodeService.findByCode(code)
    if (existingCode) {
      return NextResponse.json(
        { error: 'Este código já existe' },
        { status: 409 }
      )
    }

    // Criar o código
    const codeId = await affiliateCodeService.create({
      code: code.toUpperCase(),
      influencerName,
      influencerEmail: influencerEmail || null,
      isActive: true,
      createdByUserId: userOrResponse.id
    })

    // Buscar o código criado
    const newCode = await affiliateCodeService.findById(codeId)

    return NextResponse.json(newCode, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar código de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 