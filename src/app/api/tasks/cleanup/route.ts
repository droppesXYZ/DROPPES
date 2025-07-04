import { NextRequest, NextResponse } from 'next/server'
import { taskService } from '@/lib/firestore'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'

export async function DELETE(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) return userOrError;

    // Limpar tasks órfãs do usuário
    const deletedCount = await taskService.cleanOrphanTasks(userOrError.email)

    return NextResponse.json({
      message: `${deletedCount} tasks órfãs foram removidas`,
      deletedCount
    })
  } catch (error) {
    console.error('Erro ao limpar tasks órfãs:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 