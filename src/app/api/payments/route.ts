import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { paymentService } from '@/lib/firestore'
import { PaymentPlan, PaymentStatus } from '@/lib/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

// GET - Listar pagamentos do usuário
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

    const payments = await paymentService.findByUserId(decoded.userId)
    
    return NextResponse.json(payments)
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Submeter novo pagamento
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { plan, transactionHash } = await request.json()

    // Validação
    if (!plan || !transactionHash) {
      return NextResponse.json(
        { error: 'Plano e hash da transação são obrigatórios' },
        { status: 400 }
      )
    }

    // Extrair hash do link do Solscan se necessário
    let cleanHash = transactionHash.trim()
    
    // Se for um link do Solscan, extrair apenas o hash
    if (cleanHash.includes('solscan.io/tx/')) {
      const hashMatch = cleanHash.match(/solscan\.io\/tx\/([a-zA-Z0-9]+)/)
      if (hashMatch && hashMatch[1]) {
        cleanHash = hashMatch[1]
      }
    }
    
    // Validar formato do hash (deve ter entre 64-88 caracteres alfanuméricos)
    if (!/^[a-zA-Z0-9]{64,88}$/.test(cleanHash)) {
      return NextResponse.json(
        { error: 'Hash da transação inválido. Use apenas o hash ou o link completo do Solscan.' },
        { status: 400 }
      )
    }

    // Verificar se o plano é válido
    const validPlans = Object.values(PaymentPlan)
    if (!validPlans.includes(plan)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    // Calcular valor e data de validade baseado no plano
    let amount = 0
    const validUntil = new Date()
    
    switch (plan) {
      case PaymentPlan.MONTHLY:
        amount = 2.99
        validUntil.setMonth(validUntil.getMonth() + 1)
        break
      case PaymentPlan.QUARTERLY:
        amount = 8.07
        validUntil.setMonth(validUntil.getMonth() + 3)
        break
      case PaymentPlan.SEMI_ANNUAL:
        amount = 14.35
        validUntil.setMonth(validUntil.getMonth() + 6)
        break
    }

    // Criar pagamento pendente
    const paymentId = await paymentService.create({
      plan,
      amount,
      transactionHash: cleanHash, // Usar o hash limpo
      status: PaymentStatus.PENDING,
      validUntil,
      userId: decoded.userId
    })

    return NextResponse.json({ 
      message: 'Pagamento submetido com sucesso. Aguarde verificação.',
      paymentId 
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 