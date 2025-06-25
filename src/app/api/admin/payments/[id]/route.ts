import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { paymentService, userService } from '@/lib/firestore'
import { PaymentStatus } from '@/lib/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

const verifyAdmin = async (userId: string) => {
  const user = await userService.findById(userId)
  return user?.isAdmin === true
}

// PATCH - Aprovar ou rejeitar pagamento
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    // Verificar se é admin
    const isAdmin = await verifyAdmin(decoded.userId)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Acesso negado. Apenas administradores.' }, { status: 403 })
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
      await userService.update(payment.userId, {
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

      return NextResponse.json({ 
        message: 'Pagamento rejeitado' 
      })
    }

  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 