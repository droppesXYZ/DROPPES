'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore, useUIStore } from '@/lib/store'
import { 
  User, 
  Shield, 
  Database,
  Download,
  Trash2,
  Save,
  AlertCircle
} from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized, logout } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Verificar autenticação
  useEffect(() => {
    if (!isInitialized) {
      // Aguarda a verificação inicial do AuthProvider
      return
    }
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email
      }))
    }
  }, [isAuthenticated, isInitialized, user, router])

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(';').shift() : null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      setError('Nome e email são obrigatórios')
      return
    }

    setLoading(true)
    clearError()

    try {
      // Simular atualização (você pode implementar a API depois)
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      setError('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Todos os campos de senha são obrigatórios')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('A nova senha e confirmação não coincidem')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)
    clearError()

    try {
      // Simular alteração de senha (você pode implementar a API depois)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      alert('Senha alterada com sucesso!')
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      setError('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      // Simular exportação de dados
      const mockData = {
        user: {
          name: user?.name,
          email: user?.email,
          isPremium: user?.isPremium,
          createdAt: user?.createdAt
        },
        exportDate: new Date().toISOString(),
        note: 'Este é um exemplo de exportação de dados'
      }
      
      const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `droppes-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
      setError('Erro ao exportar dados')
    }
  }

  const handleCleanOrphanTasks = async () => {
    if (!confirm('Deseja limpar todas as tarefas órfãs (tarefas de protocolos que não existem mais)?')) {
      return
    }

    setLoading(true)
    clearError()

    try {
      const token = getCookie('token')
      const response = await fetch('/api/tasks/cleanup', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        alert(`${data.deletedCount} tarefas órfãs foram removidas com sucesso!`)
        // Recarregar a página para atualizar os dados
        window.location.reload()
      } else {
        setError(data.error || 'Erro ao limpar tarefas órfãs')
      }
    } catch (error) {
      console.error('Erro ao limpar tarefas órfãs:', error)
      setError('Erro ao limpar tarefas órfãs')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('ATENÇÃO: Esta ação é irreversível! Todos os seus dados serão perdidos permanentemente. Tem certeza que deseja deletar sua conta?')) {
      return
    }

    const confirmation = prompt('Digite "DELETAR" para confirmar:')
    if (confirmation !== 'DELETAR') {
      alert('Confirmação incorreta. Conta não foi deletada.')
      return
    }

    setLoading(true)

    try {
      // Simular deleção de conta
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Conta deletada com sucesso.')
      logout()
      router.push('/')
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
      setError('Erro ao deletar conta')
    } finally {
      setLoading(false)
    }
  }

  if (!isInitialized || (!isAuthenticated || !user)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
          <p className="text-gray-600">Verificando autenticação</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Configurações
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie suas preferências e configurações da conta
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Perfil do Usuário */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Perfil do Usuário
                </CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Status da Conta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Status da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Plano</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.isPremium 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isPremium ? 'Premium' : 'Gratuito'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Membro desde</span>
                  <span className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                {user.isPremium && user.premiumUntil && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Premium até</span>
                    <span className="text-sm text-gray-600">
                      {new Date(user.premiumUntil).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alterar Senha */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Alterar Senha
                </CardTitle>
                <CardDescription>
                  Mantenha sua conta segura com uma senha forte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      placeholder="Digite sua senha atual"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        placeholder="Digite a nova senha"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirme a nova senha"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    <Shield className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Dados e Privacidade */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Dados e Privacidade
                </CardTitle>
                <CardDescription>
                  Gerencie seus dados e configurações de privacidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Exportar Dados</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Baixe uma cópia de todos os seus dados em formato JSON
                    </p>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">Limpar Dados Órfãos</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Remove tarefas de protocolos que não existem mais
                    </p>
                    <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" onClick={handleCleanOrphanTasks}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Limpar Tarefas
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Zona de Perigo</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Deletar permanentemente sua conta e todos os dados
                    </p>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-700">{error}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="ml-auto text-red-600 hover:text-red-700"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Processando...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 