import Image from 'next/image'
import { useState } from 'react'

interface ProtocolImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
}

/**
 * Componente para carregar imagens de protocolos automaticamente via proxy
 * 
 * Exemplo de uso:
 * ```tsx
 * <ProtocolImage 
 *   src="https://static.rate-x.io/img/v1/0806c6/logo_black_icon.ico"
 *   alt="Rate X Logo"
 *   width={32}
 *   height={32}
 * />
 * ```
 * 
 * Como funciona:
 * 1. Tenta carregar a imagem diretamente
 * 2. Se falhar (erro de CORS/domínio), usa o proxy automaticamente
 * 3. Se o proxy também falhar, mostra uma imagem fallback
 */
export function ProtocolImage({ 
  src, 
  alt, 
  width = 24, 
  height = 24, 
  className = '',
  fallbackSrc = '/droppes.png' // Imagem padrão se falhar
}: ProtocolImageProps) {
  const [imageError, setImageError] = useState(false)
  const [useProxy, setUseProxy] = useState(false)

  // Função para construir a URL do proxy
  const getProxyUrl = (imageUrl: string) => {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
  }

  // Determina qual src usar
  const getImageSrc = () => {
    if (imageError) return fallbackSrc
    if (useProxy) return getProxyUrl(src)
    return src
  }

  // Handler para quando a imagem falha ao carregar
  const handleError = () => {
    if (!useProxy) {
      // Primeira tentativa: usa o proxy
      setUseProxy(true)
    } else {
      // Segunda tentativa falhou: usa fallback
      setImageError(true)
    }
  }

  return (
    <Image
      src={getImageSrc()}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized={useProxy} // Desabilita otimização do Next.js para imagens do proxy
    />
  )
} 