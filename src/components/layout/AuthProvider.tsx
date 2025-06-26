'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/lib/store'
import { getCookie, clearAuthState } from '@/lib/utils'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, isAuthenticated, user, setInitialized } = useAuthStore()
  const hasCheckedSession = useRef(false)

  useEffect(() => {
    // Só verifica a sessão uma vez no carregamento inicial
    if (hasCheckedSession.current) return
    
    const checkUserSession = async () => {
      hasCheckedSession.current = true
      const token = getCookie('token')
      
      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const userData = await response.json()
            // Só faz login se o usuário for diferente do atual
            if (!user || user.id !== userData.id) {
              login(userData)
            } else {
              setInitialized(true)
            }
          } else {
            // Token inválido ou expirado, limpa tudo
            clearAuthState()
            logout()
          }
        } catch (error) {
          console.error("Falha ao verificar sessão", error)
          clearAuthState()
          logout()
        }
      } else {
        // Não há token
        if (isAuthenticated) {
          // Mas está autenticado no estado - limpar
          logout()
        } else {
          // Estado consistente - marcar como inicializado
          setInitialized(true)
        }
      }
    }

    checkUserSession()
  }, [isAuthenticated, login, logout, setInitialized, user])

  return <>{children}</>
} 