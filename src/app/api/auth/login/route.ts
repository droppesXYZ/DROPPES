import { NextRequest, NextResponse } from 'next/server'
import { comparePassword, generateToken } from '@/lib/auth'
import { userService, twoFactorService } from '@/lib/firestore'
import { emailService } from '@/lib/email'
import { generate2FACode } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { email, password, twoFactorCode } = await request.json()

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário pelo email
    const user = await userService.findByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar se é admin e precisa de 2FA
    if (user.isAdmin) {
      // Se não forneceu código 2FA, enviar código
      if (!twoFactorCode) {
        const code = generate2FACode()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

        // Salvar código no banco
        await twoFactorService.create({
          userEmail: user.email,
          code,
          expiresAt,
          isUsed: false
        })

        // Enviar por email
        const emailSent = await emailService.send2FACode(user.email, code, user.name || undefined)
        
        if (!emailSent) {
          return NextResponse.json(
            { error: 'Erro ao enviar código de verificação' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          requires2FA: true,
          email: user.email,
          message: 'Código de verificação enviado para seu email'
        })
      }

      // Se forneceu código, verificar
      const validCode = await twoFactorService.findValidCode(user.id, twoFactorCode)
      if (!validCode) {
        return NextResponse.json(
          { error: 'Código de verificação inválido ou expirado' },
          { status: 401 }
        )
      }

      // Marcar código como usado
      await twoFactorService.markAsUsed(validCode.id)
    }

    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Remover senha do objeto user antes de enviar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 