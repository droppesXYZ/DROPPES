import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedAdmin, isErrorResponse } from '@/lib/api-auth'
import { userService } from '@/lib/firestore'

export async function POST(request: NextRequest) {
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    console.log(`🔧 Configurando admin para: ${email}`)

    // Buscar usuário no Firestore
    const user = await userService.findByEmail(email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado. O usuário deve fazer login primeiro para ser criado no sistema.' },
        { status: 404 }
      )
    }

    if (user.isAdmin) {
      return NextResponse.json(
        { 
          success: true,
          message: `Usuário ${email} já é admin`,
          user: { id: user.id, email: user.email, isAdmin: user.isAdmin }
        }
      )
    }

    // Promover a admin
    await userService.update(user.id, { isAdmin: true })
    
    console.log(`✅ Admin configurado para: ${email}`)
    
    return NextResponse.json({
      success: true,
      message: `Admin configurado para ${email}`,
      user: { id: user.id, email: user.email, isAdmin: true }
    })

  } catch (error) {
    console.error('Erro ao configurar admin:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Rota GET para listar admins
export async function GET() {
  try {
    // Verificar se quem está fazendo a requisição é admin
    const currentUserOrError = await requireAuthenticatedAdmin();
    if (isErrorResponse(currentUserOrError)) {
      return currentUserOrError;
    }

    // Buscar todos os usuários admin
    const allUsers = await userService.findAll()
    const admins = allUsers.filter(user => user.isAdmin).map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      createdAt: user.createdAt
    }))

    return NextResponse.json({
      success: true,
      admins,
      count: admins.length
    })

  } catch (error) {
    console.error('Erro ao listar admins:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 