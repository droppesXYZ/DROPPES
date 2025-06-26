import { NextRequest, NextResponse } from 'next/server'
import { twoFactorService } from '@/lib/firestore'

export async function POST(request: NextRequest) {
  try {
    // Verificar se é uma chamada interna (opcional - adicionar auth se necessário)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Limpar códigos expirados
    await twoFactorService.deleteExpiredCodes()

    return NextResponse.json({
      message: 'Códigos 2FA expirados removidos com sucesso'
    })

  } catch (error) {
    console.error('Erro ao limpar códigos 2FA:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 