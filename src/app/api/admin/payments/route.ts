import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedAdmin, isErrorResponse } from '@/lib/api-auth'
import { paymentService, userService } from '@/lib/firestore'

// A lógica de GET foi desativada temporariamente para focar na migração para Stack Auth.
export async function GET() {
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    // Buscar todos os pagamentos com dados do usuário
    const payments = await paymentService.findAll()
    
    // Enriquecer com dados do usuário
    const paymentsWithUser = await Promise.all(
      payments
        .filter(payment => !!payment.userEmail)
        .map(async (payment) => {
          const user = await userService.findByEmail(payment.userEmail)
          return {
            ...payment,
            user: user ? {
              id: user.id,
              name: user.name,
              email: user.email
            } : null
          }
        })
    )

    return NextResponse.json(paymentsWithUser)
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// A funcionalidade de POST (criar pagamento) foi desativada temporariamente.
export async function POST(request: NextRequest) {
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    const paymentData = await request.json()
    
    // Validar dados obrigatórios
    if (!paymentData.userEmail || !paymentData.plan || !paymentData.amount) {
      return NextResponse.json(
        { error: 'userEmail, plan e amount são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o usuário existe
    const user = await userService.findByEmail(paymentData.userEmail)
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Criar pagamento
    const paymentId = await paymentService.create({
      ...paymentData,
      status: paymentData.status || 'PENDING',
      validUntil: paymentData.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const newPayment = await paymentService.findById(paymentId)
    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
  return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 