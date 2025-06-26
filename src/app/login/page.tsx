'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { useUIStore } from '@/lib/store'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'
import { clearAuthState } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const { login, logout } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    clearError()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login')
      }

      // Verificar se precisa de 2FA
      if (data.requires2FA) {
        setRequires2FA(true)
        setAdminEmail(data.email)
        setError(`Código de verificação enviado para ${data.email}`)
        return
      }

      // Limpar qualquer estado anterior
      clearAuthState()
      logout()
      
      // Armazenar token no cookie
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 dias

      // Atualizar estado de autenticação
      login(data.user)

      // Redirecionar para dashboard
      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/droppes.png"
              alt="Droppes Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {requires2FA ? 'Verificação 2FA' : 'Entrar'}
          </CardTitle>
          <CardDescription>
            {requires2FA 
              ? `Digite o código enviado para ${adminEmail}`
              : 'Entre com sua conta para acessar seus protocolos'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!requires2FA ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">Código de Verificação</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    placeholder="123456"
                    value={formData.twoFactorCode}
                    onChange={handleInputChange}
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Digite o código de 6 dígitos enviado para seu email
                </p>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading 
                ? (requires2FA ? 'Verificando...' : 'Entrando...') 
                : (requires2FA ? 'Verificar Código' : 'Entrar')
              }
            </Button>
            
            {requires2FA && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setRequires2FA(false)
                  setFormData(prev => ({ ...prev, twoFactorCode: '' }))
                  clearError()
                }}
              >
                Voltar
              </Button>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 