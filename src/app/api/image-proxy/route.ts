import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Pega a URL da imagem dos parâmetros de query
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
    
    if (!imageUrl) {
      return new NextResponse('URL da imagem é obrigatória', { status: 400 })
    }

    // Valida se é uma URL válida
    let url: URL
    try {
      url = new URL(imageUrl)
    } catch {
      return new NextResponse('URL inválida', { status: 400 })
    }

    // Só permite HTTPS por segurança
    if (url.protocol !== 'https:') {
      return new NextResponse('Apenas URLs HTTPS são permitidas', { status: 400 })
    }

    // Faz o fetch da imagem
    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
      },
    })

    if (!imageResponse.ok) {
      return new NextResponse('Erro ao carregar imagem', { status: imageResponse.status })
    }

    // Verifica se é realmente uma imagem
    const contentType = imageResponse.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      return new NextResponse('O arquivo não é uma imagem válida', { status: 400 })
    }

    // Pega o buffer da imagem
    const imageBuffer = await imageResponse.arrayBuffer()

    // Retorna a imagem com os headers apropriados
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache por 1 ano
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Erro no proxy de imagem:', error)
    return new NextResponse('Erro interno do servidor', { status: 500 })
  }
} 