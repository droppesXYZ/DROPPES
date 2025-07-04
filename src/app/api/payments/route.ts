import { NextRequest, NextResponse } from 'next/server'
import { paymentService, affiliateCodeService, affiliateUsageService } from '@/lib/firestore'
import { PaymentPlan, PaymentStatus, AFFILIATE_DISCOUNT_PERCENTAGE, AFFILIATE_COMMISSION_PERCENTAGE } from '@/lib/types'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

// GET - Listar pagamentos do usuário
export async function GET() {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const payments = await paymentService.findByUserEmail(userOrError.email)
    return NextResponse.json(payments)
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Submeter novo pagamento
export async function POST(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    const { plan, transactionHash, affiliateCode } = await request.json()

    if (!plan || !transactionHash) {
      return NextResponse.json(
        { error: 'Plano e hash da transação são obrigatórios' },
        { status: 400 }
      )
    }

    let cleanHash = transactionHash.trim()
    if (cleanHash.includes('solscan.io/tx/')) {
      const hashMatch = cleanHash.match(/solscan\.io\/tx\/([a-zA-Z0-9]+)/)
      if (hashMatch && hashMatch[1]) {
        cleanHash = hashMatch[1]
      }
    }
    if (!/^[a-zA-Z0-9]{64,88}$/.test(cleanHash)) {
      return NextResponse.json(
        { error: 'Hash da transação inválido. Use apenas o hash ou o link completo do Solscan.' },
        { status: 400 }
      )
    }

    const validPlans = Object.values(PaymentPlan)
    if (!validPlans.includes(plan)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    let originalAmount = 0
    const validUntil = new Date()
    switch (plan) {
      case PaymentPlan.MONTHLY:
        originalAmount = 5.00
        validUntil.setMonth(validUntil.getMonth() + 1)
        break
      case PaymentPlan.QUARTERLY:
        originalAmount = 13.50
        validUntil.setMonth(validUntil.getMonth() + 3)
        break
      case PaymentPlan.SEMI_ANNUAL:
        originalAmount = 24.00
        validUntil.setMonth(validUntil.getMonth() + 6)
        break
    }

    let affiliateCodeData = null
    let finalAmount = originalAmount
    let discountAmount = 0
    let commissionAmount = 0

    if (affiliateCode) {
      affiliateCodeData = await affiliateCodeService.findByCode(affiliateCode)
      if (!affiliateCodeData) {
        return NextResponse.json(
          { error: 'Código de afiliado inválido' },
          { status: 400 }
        )
      }
      if (!affiliateCodeData.isActive) {
        return NextResponse.json(
          { error: 'Código de afiliado inativo' },
          { status: 400 }
        )
      }
      discountAmount = (originalAmount * AFFILIATE_DISCOUNT_PERCENTAGE) / 100
      finalAmount = originalAmount - discountAmount
      commissionAmount = (finalAmount * AFFILIATE_COMMISSION_PERCENTAGE) / 100
    }

    const paymentId = await paymentService.create({
      plan,
      amount: finalAmount,
      originalAmount,
      discountAmount: discountAmount || null,
      affiliateCodeUsed: affiliateCode ? affiliateCode : null,
      transactionHash: cleanHash || null,
      status: PaymentStatus.PENDING,
      verifiedAt: null,
      validUntil,
      userEmail: userOrError.email,
    })

    if (affiliateCodeData) {
      await affiliateUsageService.create({
        affiliateCodeId: affiliateCodeData.id,
        userEmail: userOrError.email,
        paymentId,
        originalAmount,
        discountAmount: discountAmount || 0,
        finalAmount,
        commissionAmount
      })
    }

    return NextResponse.json({ 
      message: 'Pagamento submetido com sucesso. Aguarde verificação.',
      paymentId,
      finalAmount,
      discountApplied: !!affiliateCodeData,
      discountAmount: affiliateCodeData ? discountAmount : 0
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 