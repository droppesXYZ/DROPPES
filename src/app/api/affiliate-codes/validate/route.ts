import { NextRequest, NextResponse } from 'next/server'
import { affiliateCodeService } from '@/lib/firestore'

// POST /api/affiliate-codes/validate - Validar código de afiliado (público)
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Código é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar o código
    const affiliateCode = await affiliateCodeService.findByCode(code)

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'Código não encontrado' },
        { status: 404 }
      )
    }

    if (!affiliateCode.isActive) {
      return NextResponse.json(
        { error: 'Código inativo' },
        { status: 400 }
      )
    }

    // Retornar informações do código (sem dados sensíveis)
    return NextResponse.json({
      id: affiliateCode.id,
      code: affiliateCode.code,
      influencerName: affiliateCode.influencerName,
      isValid: true
    })

  } catch (error) {
    console.error('Erro ao validar código de afiliado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 