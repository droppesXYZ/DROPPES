import { NextRequest, NextResponse } from 'next/server'
import { twoFactorService, userService } from '@/lib/firestore'
import { getUserOrError } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    let isAuthorized = false

    // Permitir chamada interna via CRON_SECRET
    if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
      isAuthorized = true
    } else {
      // Permitir admin autenticado via Stack Auth
      const userOrError = await getUserOrError();
      if (!(userOrError instanceof NextResponse)) {
        const userEmail = userOrError.primaryEmail;
        if (userEmail) {
          const user = await userService.findByEmail(userEmail)
          if (user?.isAdmin) isAuthorized = true
        }
      }
    }

    if (!isAuthorized) {
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
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 