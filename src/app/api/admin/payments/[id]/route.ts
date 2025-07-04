import { NextRequest, NextResponse } from 'next/server'
import { paymentService, userService } from '@/lib/firestore'
import { PaymentStatus } from '@/lib/types'
import { requireAuthenticatedAdmin, isErrorResponse } from '@/lib/api-auth'

// PATCH - Aprovar ou rejeitar pagamento
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    const { action } = await request.json() // 'approve' ou 'reject'
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Ação inválida. Use "approve" ou "reject"' },
        { status: 400 }
      )
    }

    // Buscar o pagamento
    const payment = await paymentService.findById(id)
    if (!payment) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 })
    }

    if (payment.status !== PaymentStatus.PENDING) {
      return NextResponse.json(
        { error: 'Pagamento já foi processado' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      // Aprovar pagamento
      await paymentService.update(id, {
        status: PaymentStatus.VERIFIED,
        verifiedAt: new Date()
      })

      // Atualizar usuário para Premium
      const user = await userService.findByEmail(payment.userEmail)
      if (!user) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
      }
      await userService.update(user.id, {
        isPremium: true,
        premiumUntil: payment.validUntil
      })

      return NextResponse.json({ 
        message: 'Pagamento aprovado e usuário atualizado para Premium' 
      })
    } else {
      // Rejeitar pagamento
      await paymentService.update(id, {
        status: PaymentStatus.REJECTED
      })

      // Se foi rejeitado e usuário está premium, pode precisar revogar
      const user = await userService.findByEmail(payment.userEmail)
      if (user && user.isPremium) {
        // Verificar se tem outros pagamentos válidos
        const validPayments = await paymentService.findByUserEmail(user.email)
        const hasOtherValidPayment = validPayments.some(p => 
          p.id !== payment.id && 
          p.status === PaymentStatus.VERIFIED &&
          p.validUntil > new Date()
        )
      }

      return NextResponse.json({ 
        message: 'Pagamento rejeitado' 
      })
    }
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// GET - Buscar pagamento específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    // Buscar o pagamento
    const payment = await paymentService.findById(id)
    if (!payment) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 })
    }

    // Enriquecer com dados do usuário
    const user = await userService.findByEmail(payment.userEmail)
    const paymentWithUser = {
      ...payment,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email
      } : null
    }

    return NextResponse.json(paymentWithUser)
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE - Excluir pagamento
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    // Buscar o pagamento
    const payment = await paymentService.findById(id)
    if (!payment) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 })
    }

    // Excluir pagamento
    await paymentService.delete(id)

    return NextResponse.json({ message: 'Pagamento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir pagamento:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 