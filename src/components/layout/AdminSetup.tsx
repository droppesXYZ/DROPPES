'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'

export function AdminSetup() {
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const setupAdmin = async () => {
      if (!isAuthenticated || !user) return

      // Lista de emails que devem ser automaticamente promovidos a admin
      const ADMIN_EMAILS = [
        'brunnin.duarte100@gmail.com',
        'droppes.xyz@gmail.com'
      ]

      // Verificar se o usuário deve ser admin
      if (ADMIN_EMAILS.includes(user.email.toLowerCase()) && !user.isAdmin) {
        try {
          console.log('🔧 Configurando admin automaticamente para:', user.email)
          
          const response = await fetch('/api/auth/setup-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })

          if (response.ok) {
            const data = await response.json()
            console.log('✅ Admin configurado automaticamente:', data.message)
            
            // Atualizar o store local
            useAuthStore.getState().updateUser({ isAdmin: true })
          } else {
            console.error('❌ Erro ao configurar admin automaticamente')
          }
        } catch (error) {
          console.error('❌ Erro ao configurar admin:', error)
        }
      }
    }

    setupAdmin()
  }, [user, isAuthenticated])

  return null // Este componente não renderiza nada
} 