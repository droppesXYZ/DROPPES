'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/lib/store'
import { useUser } from '@stackframe/stack'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, isAuthenticated, user: localUser, setInitialized } = useAuthStore()
  const stackUser = useUser() // Stack Auth user
  const hasCheckedSession = useRef(false)

  useEffect(() => {
    // Só verifica a sessão uma vez no carregamento inicial
    if (hasCheckedSession.current) return
    
    const checkUserSession = async () => {
      hasCheckedSession.current = true
      
      // Se há usuário do Stack Auth
      if (stackUser) {
        // Sincronizar com o store local se necessário
        if (!localUser || localUser.id !== stackUser.id) {
          // Buscar dados do usuário local via API
          try {
            const response = await fetch('/api/auth/me', {
              credentials: 'include'
            })
            
            if (response.ok) {
              const userData = await response.json()
              login(userData)
            } else {
              // Se a API falhar, criar usuário temporário
              const convertedUser = {
                id: stackUser.id,
                email: stackUser.primaryEmail || '',
                name: stackUser.displayName || null,
                isPremium: false,
                premiumUntil: null,
                isAdmin: false,
                password: '',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              login(convertedUser)
            }
          } catch (error) {
            console.error('Erro ao sincronizar usuário:', error)
            // Fallback para usuário temporário
          const convertedUser = {
            id: stackUser.id,
            email: stackUser.primaryEmail || '',
            name: stackUser.displayName || null,
              isPremium: false,
            premiumUntil: null,
              isAdmin: false,
              password: '',
              createdAt: new Date(),
              updatedAt: new Date(),
          }
          login(convertedUser)
          }
        }
      } else {
        // Se não há usuário do Stack Auth, limpar o store local
        if (isAuthenticated) {
          logout()
        }
      }
      
      setInitialized(true)
    }

    // Aguarda um pouco para garantir que o Stack Auth carregou
    const timer = setTimeout(checkUserSession, 100)
    
    return () => clearTimeout(timer)
  }, [stackUser, localUser, isAuthenticated, login, logout, setInitialized])

  return <>{children}</>
} 