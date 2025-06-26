import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { paymentService, userService } from '@/lib/firestore'
import { Payment } from '@/lib/types'

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

// GET - Listar todos os pagamentos (apenas admin)
export async function GET(request: NextRequest) {
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

    // Buscar todos os pagamentos
    const payments = await paymentService.findAll()
    
    // Buscar dados dos usuários para cada pagamento
    const paymentsWithUsers = await Promise.all(
      payments.map(async (payment: Payment) => {
        const user = await userService.findById(payment.userId)
        return {
          ...payment,
          user: user ? { id: user.id, name: user.name, email: user.email } : null
        }
      })
    )
    
    return NextResponse.json(paymentsWithUsers)
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 