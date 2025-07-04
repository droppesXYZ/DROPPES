'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore, useUIStore } from '@/lib/store'
import { AffiliateCode, AffiliateStats } from '@/lib/types'
import { 
  Plus, 
  Trash2, 
  Eye,
  EyeOff,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Tag,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'

export default function AdminAffiliatesPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [codes, setCodes] = useState<AffiliateCode[]>([])
  const [stats, setStats] = useState<AffiliateStats[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [formData, setFormData] = useState({
    code: '',
    influencerName: '',
    influencerEmail: ''
  })

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  const fetchCodes = useCallback(async () => {
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/affiliate-codes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCodes(data)
      } else {
        setError('Erro ao carregar códigos de afiliado')
      }
    } catch (error) {
      console.error('Erro ao carregar códigos:', error)
      setError('Erro ao carregar códigos de afiliado')
    }
  }, [setError])

  const fetchStats = useCallback(async () => {
    try {
      const token = getCookie('token')
      let url = '/api/affiliate-stats'
      
      const params = new URLSearchParams()
      if (selectedMonth) params.append('month', selectedMonth)
      if (selectedYear) params.append('year', selectedYear)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        setError('Erro ao carregar estatísticas')
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      setError('Erro ao carregar estatísticas')
    }
  }, [selectedMonth, selectedYear, setError])

  // Verificar autenticação e permissão de admin
  useEffect(() => {
    if (!isInitialized) return
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (!user?.isAdmin) {
      router.push('/dashboard')
      return
    }
    
    fetchCodes()
    fetchStats()
  }, [isAuthenticated, isInitialized, user, router, fetchCodes, fetchStats])

  const handleCreateCode = async () => {
    if (!formData.code || !formData.influencerName) {
      setError('Código e nome do influenciador são obrigatórios')
      return
    }

    setLoading(true)
    clearError()
    
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/affiliate-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCodes()
        setIsCreateDialogOpen(false)
        setFormData({ code: '', influencerName: '', influencerEmail: '' })
        alert('Código criado com sucesso!')
      } else {
        setError(data.error || 'Erro ao criar código')
      }
    } catch (error) {
      console.error('Erro ao criar código:', error)
      setError('Erro ao criar código')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (codeId: string) => {
    setLoading(true)
    clearError()
    
    try {
      const token = getCookie('token')
      const code = codes.find(c => c.id === codeId)
      
      const response = await fetch(`/api/affiliate-codes/${codeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...code,
          isActive: !code?.isActive
        })
      })

      if (response.ok) {
        await fetchCodes()
        alert(`Código ${code?.isActive ? 'desativado' : 'ativado'} com sucesso!`)
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao atualizar código')
      }
    } catch (error) {
      console.error('Erro ao atualizar código:', error)
      setError('Erro ao atualizar código')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCode = async (codeId: string) => {
    if (!confirm('Tem certeza que deseja excluir este código? Esta ação não pode ser desfeita.')) {
      return
    }

    setLoading(true)
    clearError()
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/affiliate-codes/${codeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchCodes()
        alert('Código excluído com sucesso!')
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao excluir código')
      }
    } catch (error) {
      console.error('Erro ao excluir código:', error)
      setError('Erro ao excluir código')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Carregando...</h1>
          <p className="text-gray-600 dark:text-gray-300">Verificando autenticação</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Acesso Negado</h1>
          <p className="text-gray-600 dark:text-gray-300">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  const totalStats = stats.reduce((acc, stat) => ({
    totalUsages: acc.totalUsages + stat.totalUsages,
    totalRevenue: acc.totalRevenue + stat.totalRevenue,
    totalCommission: acc.totalCommission + stat.totalCommission
  }), { totalUsages: 0, totalRevenue: 0, totalCommission: 0 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sistema de Afiliados</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Gerencie códigos de afiliado e comissões</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Código
            </Button>
          </div>
        </div>

        {/* Estatísticas resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Total de Códigos</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{codes.length}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                {codes.filter(c => c.isActive).length} ativos
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Total de Usos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{totalStats.totalUsages}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Códigos utilizados
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{formatCurrency(totalStats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                De vendas com códigos
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Comissões Totais</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{formatCurrency(totalStats.totalCommission)}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                A pagar aos afiliados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros de período */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Calendar className="w-5 h-5" />
              Filtrar por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div>
                <Label htmlFor="month" className="dark:text-gray-300">Mês</Label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-3 py-2"
                >
                  <option value="">Todos os meses</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="year" className="dark:text-gray-300">Ano</Label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-3 py-2"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={fetchStats}>
                  Filtrar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de códigos */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Códigos de Afiliado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left p-2 dark:text-gray-300">Código</th>
                    <th className="text-left p-2 dark:text-gray-300">Influenciador</th>
                    <th className="text-left p-2 dark:text-gray-300">Email</th>
                    <th className="text-left p-2 dark:text-gray-300">Status</th>
                    <th className="text-left p-2 dark:text-gray-300">Criado em</th>
                    <th className="text-left p-2 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((code) => (
                    <tr key={code.id} className="border-b dark:border-gray-600">
                      <td className="p-2 font-mono font-bold dark:text-white">{code.code}</td>
                      <td className="p-2 dark:text-gray-300">{code.influencerName}</td>
                      <td className="p-2 dark:text-gray-300">{code.influencerEmail || '-'}</td>
                      <td className="p-2">
                        <Badge
                          className={code.isActive
                            ? "bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30"
                            : "bg-gray-500/20 text-gray-700 border-gray-500/30 dark:bg-gray-700/20 dark:text-gray-300 dark:border-gray-700/30"}
                        >
                          {code.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </td>
                      <td className="p-2 dark:text-gray-300">{formatDate(code.createdAt)}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleActive(code.id)}
                          >
                            {code.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCode(code.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas detalhadas */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Desempenho por Código</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left p-2 dark:text-gray-300">Código</th>
                    <th className="text-left p-2 dark:text-gray-300">Influenciador</th>
                    <th className="text-left p-2 dark:text-gray-300">Usos</th>
                    <th className="text-left p-2 dark:text-gray-300">Receita</th>
                    <th className="text-left p-2 dark:text-gray-300">Comissão</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat) => (
                    <tr key={stat.codeId} className="border-b dark:border-gray-600">
                      <td className="p-2 font-mono font-bold dark:text-white">{stat.code}</td>
                      <td className="p-2 dark:text-gray-300">{stat.influencerName}</td>
                      <td className="p-2 dark:text-gray-300">{stat.totalUsages}</td>
                      <td className="p-2 dark:text-gray-300">{formatCurrency(stat.totalRevenue)}</td>
                      <td className="p-2 font-bold text-green-600 dark:text-green-400">{formatCurrency(stat.totalCommission)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}

        {/* Dialog para criar novo código */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Criar Novo Código de Afiliado</DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Crie um novo código para um influenciador
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="code" className="dark:text-gray-300">Código de Afiliado *</Label>
                <Input
                  id="code"
                  placeholder="Ex: JOHN20, CRIPTOANA"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="influencerName" className="dark:text-gray-300">Nome do Influenciador *</Label>
                <Input
                  id="influencerName"
                  placeholder="Nome completo do influenciador"
                  value={formData.influencerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, influencerName: e.target.value }))}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="influencerEmail" className="dark:text-gray-300">Email do Influenciador</Label>
                <Input
                  id="influencerEmail"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.influencerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, influencerEmail: e.target.value }))}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCode} disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Código'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 