import { NextRequest, NextResponse } from 'next/server'
import { requireAuthenticatedUser, isErrorResponse } from '@/lib/api-auth'
import { protocolService, investmentService, taskService, airdropService, protocolLinkService } from '@/lib/firestore'
import { FREE_PROTOCOL_LIMIT } from '@/lib/constants'

// Função para verificar se o usuário é premium (agora busca no nosso DB)
async function isUserPremium(userEmail: string): Promise<boolean> {
  const { userService } = await import('@/lib/firestore');
  const localUser = await userService.findByEmail(userEmail);
  return localUser?.isPremium || false;
}

export async function GET() {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError
    }
    
    const protocols = await protocolService.findByUserEmail(userOrError.email);
    return NextResponse.json(protocols);
  } catch (error) {
    console.error('Erro ao buscar protocolos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userOrError = await requireAuthenticatedUser();
    if (isErrorResponse(userOrError)) {
      return userOrError
    }

    // Verificar limite de protocolos para usuários não premium
    if (!userOrError.isPremium) {
      const existingProtocols = await protocolService.findByUserEmail(userOrError.email);
      if (existingProtocols.length >= FREE_PROTOCOL_LIMIT) {
        return NextResponse.json(
          { error: 'Limite de protocolos atingido. Faça upgrade para Premium.' },
          { status: 403 }
        );
      }
    }

    const { name, network, officialUrl, twitterHandle, dailyMissions, totalInvested, isActive } = await request.json();

    if (!name || !network || !officialUrl) {
      return NextResponse.json(
        { error: 'Nome, rede e URL oficial são obrigatórios' },
        { status: 400 }
      );
    }

    const protocolId = await protocolService.create({
      name,
      network,
      officialUrl,
      twitterHandle: twitterHandle || null,
      farmStartDate: null,
      dailyMissions: dailyMissions || false,
      logoUrl: null,
      primaryColor: null,
      textColor: null,
      totalInvested: totalInvested || 0,
      isActive: isActive !== undefined ? isActive : true,
      userEmail: userOrError.email,
    });

    const newProtocol = await protocolService.findById(protocolId);
    return NextResponse.json(newProtocol, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar protocolo:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 