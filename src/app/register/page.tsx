'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'
import { StaticBackground } from '@/components/ui/static-background'
import { SignUp, useUser } from "@stackframe/stack"
import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'

export default function RegisterPage() {
  const router = useRouter()
  const user = useUser()
  const { isInitialized, isAuthenticated } = useAuthStore()
  
  // Redirecionar só após inicialização e autenticação
  useEffect(() => {
    if (!isInitialized) return
    if (user && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [user, isAuthenticated, isInitialized, router])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-slate-300 text-lg">Carregando...</span>
      </div>
    )
  }

  return (
    <StaticBackground>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                src="/droppes.png"
                alt="Droppes Logo"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-slate-300">
              Crie sua conta para começar a gerenciar seus airdrops
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Stack Auth SignUp Component com estilo customizado */}
            <div className="stack-auth-signup">
              <SignUp 
                fullPage={false}
                automaticRedirect={false}
                appearance={{
                  elements: {
                    input: 'bg-slate-800 text-white placeholder:text-slate-400',
                    label: 'text-slate-200',
                    icon: 'text-slate-200',
                    button: 'bg-blue-600 text-white',
                  }
                }}
              />
            </div>
            
            <div className="text-center mt-6">
              <span className="text-slate-400">Já tem uma conta? </span>
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Faça login aqui
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaticBackground>
  )
} 