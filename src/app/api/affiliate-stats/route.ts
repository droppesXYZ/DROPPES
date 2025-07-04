import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedAdmin, isErrorResponse } from '@/lib/api-auth'
import { affiliateCodeService, affiliateUsageService, userService, paymentService } from '@/lib/firestore'
import { AffiliateStats, PaymentPlan } from '@/lib/types'

// GET /api/affiliate-stats - Buscar estatísticas de afiliados (apenas admin)
export async function GET(request: NextRequest) {
  try {
    const userOrResponse = await requireAuthenticatedAdmin()
    if (isErrorResponse(userOrResponse)) {
      return userOrResponse
    }

    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const year = searchParams.get('year')

    let usages
    if (month && year) {
      usages = await affiliateUsageService.findByMonth(parseInt(year), parseInt(month))
    } else {
      usages = await affiliateUsageService.findAll()
    }

    // Buscar códigos de afiliado
    const codes = await affiliateCodeService.findAll()

    // Buscar informações dos usuários e pagamentos
    const stats: AffiliateStats[] = []

    for (const code of codes) {
      const codeUsages = usages.filter(usage => usage.affiliateCodeId === code.id)
      
      const usagesWithDetails = await Promise.all(
        codeUsages.map(async usage => {
          const user = await userService.findByEmail(usage.userEmail)
          const payment = await paymentService.findById(usage.paymentId)
          
          let planName = 'Desconhecido'
          if (payment) {
            switch (payment.plan) {
              case PaymentPlan.MONTHLY:
                planName = 'Mensal'
                break
              case PaymentPlan.QUARTERLY:
                planName = 'Trimestral'
                break
              case PaymentPlan.SEMI_ANNUAL:
                planName = 'Semestral'
                break
            }
          }

          return {
            ...usage,
            userEmail: user?.email || 'Desconhecido',
            planName,
            paymentDate: payment?.createdAt || usage.createdAt
          }
        })
      )

      const totalRevenue = codeUsages.reduce((sum, usage) => sum + usage.finalAmount, 0)
      const totalCommission = codeUsages.reduce((sum, usage) => sum + usage.commissionAmount, 0)

      stats.push({
        codeId: code.id,
        code: code.code,
        influencerName: code.influencerName,
        totalUsages: codeUsages.length,
        totalRevenue,
        totalCommission,
        usages: usagesWithDetails
      })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erro ao buscar estatísticas de afiliados:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 