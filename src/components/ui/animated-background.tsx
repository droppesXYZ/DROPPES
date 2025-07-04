'use client'

import { useEffect, useState } from 'react'

interface Drop {
  id: number
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  position: string
  animation: string
  delay: number
}

interface AnimatedBackgroundProps {
  children?: React.ReactNode
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    // Gerar 50 gotas com propriedades aleatórias
    const generateDrops = (): Drop[] => {
      const dropSizes: Drop['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']
      const animations = ['animate-rain-1', 'animate-rain-2', 'animate-rain-3', 'animate-rain-4', 'animate-rain-5', 'animate-rain-6']
      const positions = [
        'left-1', 'left-2', 'left-3', 'left-4', 'left-5',
        'right-1', 'right-2', 'right-3', 'right-4', 'right-5'
      ]
      
      const generatedDrops: Drop[] = []
      
      // Setor Superior (15 gotas)
      for (let i = 0; i < 15; i++) {
        generatedDrops.push({
          id: i,
          size: dropSizes[Math.floor(Math.random() * dropSizes.length)],
          position: `sector-top ${positions[Math.floor(Math.random() * positions.length)]}`,
          animation: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 8
        })
      }
      
      // Setor Médio (15 gotas)
      for (let i = 15; i < 30; i++) {
        generatedDrops.push({
          id: i,
          size: dropSizes[Math.floor(Math.random() * dropSizes.length)],
          position: `sector-middle ${positions[Math.floor(Math.random() * positions.length)]}`,
          animation: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 10
        })
      }
      
      // Setor Inferior (15 gotas)
      for (let i = 30; i < 45; i++) {
        generatedDrops.push({
          id: i,
          size: dropSizes[Math.floor(Math.random() * dropSizes.length)],
          position: `sector-bottom ${positions[Math.floor(Math.random() * positions.length)]}`,
          animation: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 12
        })
      }
      
      // Gotas espalhadas extras (5 gotas)
      for (let i = 45; i < 50; i++) {
        generatedDrops.push({
          id: i,
          size: dropSizes[Math.floor(Math.random() * dropSizes.length)],
          position: `absolute`,
          animation: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 15
        })
      }
      
      return generatedDrops
    }

    setDrops(generateDrops())
  }, [])

  return (
    <>
      {/* Container das Gotas */}
      <div className="drops-container">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className={`drop drop-${drop.size} ${drop.position} ${drop.animation}`}
            style={{
              animationDelay: `${drop.delay}s`,
              left: drop.position === 'absolute' ? `${Math.random() * 90 + 5}%` : undefined,
              top: drop.position === 'absolute' ? `${Math.random() * 100}vh` : undefined,
            }}
          />
        ))}
      </div>
      {children}
    </>
  )
} 