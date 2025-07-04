'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { useUser } from '@stackframe/stack'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import { 
  User, 
  Shield, 
  Settings,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const stackUser = useUser()

  // Verificar autenticação
  useEffect(() => {
    if (!isInitialized) {
      // Aguarda a verificação inicial do AuthProvider
      return
    }
    
    if (!isAuthenticated || !stackUser) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, isInitialized, stackUser, router])

  if (!isAuthenticated || !stackUser) {
    return null // Ou um loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/droppes.png"
              alt="Droppes Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Configurações da Conta</h1>
          <p className="text-slate-300">Gerencie suas informações pessoais e preferências</p>
        </div>

        {/* Configurações Stack Auth */}
        <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">Informações da Conta</CardTitle>
            </div>
            <CardDescription className="text-slate-300">
              Atualize suas informações pessoais e configurações de segurança
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-300 mb-4">
                Para gerenciar suas configurações de conta e segurança, visite:
              </p>
              <Link href="/handler/account-settings/" passHref>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ir para Gerenciamento de Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Informações Premium */}
        {user && (
          <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-white">Status da Conta</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Informações sobre seu plano e benefícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">Plano Atual:</span>
                  <span className={`font-medium ${user.isPremium ? 'text-amber-400' : 'text-slate-400'}`}>
                    {user.isPremium ? 'Premium' : 'Gratuito'}
                  </span>
                </div>
                
                {user.isPremium && user.premiumUntil && (
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Premium até:</span>
                    <span className="text-amber-400 font-medium">
                      {new Date(user.premiumUntil).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
                
                {user.isAdmin && (
                  <div className="flex items-center justify-between p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <span className="text-blue-300">Acesso Administrativo:</span>
                    <span className="text-blue-400 font-medium">Ativo</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 