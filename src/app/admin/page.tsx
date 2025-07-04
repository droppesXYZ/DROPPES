'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore, useUIStore } from '@/lib/store'
import { PaymentStatus, PaymentPlan } from '@/lib/types'
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  User,
  Eye,
  AlertTriangle,
  Tag,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

interface PaymentWithUser {
  id: string
  plan: PaymentPlan
  amount: number
  transactionHash?: string
  status: PaymentStatus
  verifiedAt?: Date
  validUntil: Date
  createdAt: Date
  user: {
    id: string
    name: string
    email: string
  } | null
}

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [payments, setPayments] = useState<PaymentWithUser[]>([])

  const fetchPayments = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/payments', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      } else {
        setError('Erro ao carregar pagamentos')
      }
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error)
      setError('Erro ao carregar pagamentos')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])

  // Verificar autenticação e permissão de admin
  useEffect(() => {
    if (!isInitialized) {
      // Aguarda a verificação inicial do AuthProvider
      return
    }
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (!user?.isAdmin) {
      router.push('/dashboard')
      return
    }
    
    fetchPayments()
  }, [isAuthenticated, isInitialized, user, router, fetchPayments])

  const handlePaymentAction = async (paymentId: string, action: 'approve' | 'reject') => {
    setLoading(true)
    clearError()
    
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ action })
      })

      const data = await response.json()

      if (response.ok) {
        // Atualizar lista de pagamentos
        await fetchPayments()
        alert(data.message)
      } else {
        setError(data.error || 'Erro ao processar pagamento')
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      setError('Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePayment = async (paymentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este pagamento? Esta ação não pode ser desfeita.')) {
      return
    }
    setLoading(true)
    clearError()
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()
      if (response.ok) {
        await fetchPayments()
        alert('Pagamento excluído com sucesso!')
      } else {
        setError(data.error || 'Erro ao excluir pagamento')
      }
    } catch (error) {
      setError('Erro ao excluir pagamento')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>
      case PaymentStatus.VERIFIED:
        return <Badge variant="outline" className="border-green-500 text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Aprovado</Badge>
      case PaymentStatus.REJECTED:
        return <Badge variant="outline" className="border-red-500 text-red-600"><XCircle className="w-3 h-3 mr-1" />Rejeitado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getPlanName = (plan: PaymentPlan) => {
    switch (plan) {
      case PaymentPlan.MONTHLY:
        return 'Mensal'
      case PaymentPlan.QUARTERLY:
        return 'Trimestral'
      case PaymentPlan.SEMI_ANNUAL:
        return 'Semestral'
      default:
        return 'Desconhecido'
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
          <p className="text-gray-600">Verificando autenticação</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  const pendingPayments = payments.filter(p => p.status === PaymentStatus.PENDING)
  const processedPayments = payments.filter(p => p.status !== PaymentStatus.PENDING)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Painel Administrativo
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Gerencie pagamentos e usuários premium
                </p>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex gap-4 mb-6">
              <Card className="flex-1 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Pagamentos</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Gerenciar assinaturas e pagamentos</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                      Atual
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Link href="/admin/affiliates" className="flex-1">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Tag className="w-6 h-6 text-green-600 dark:text-green-400" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Sistema de Afiliados</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Códigos e comissões de afiliados</p>
                        </div>
                      </div>
                      <div className="text-green-600 dark:text-green-400 font-medium">→</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Pagamentos Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{pendingPayments.length}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Aguardando aprovação
                  </p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Total de Pagamentos</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{payments.length}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Todos os pagamentos
                  </p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">
                    {formatCurrency(payments.filter(p => p.status === PaymentStatus.VERIFIED).reduce((sum, p) => sum + p.amount, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Pagamentos aprovados
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pagamentos Pendentes */}
          {pendingPayments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Pagamentos Pendentes
              </h2>
              
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <Card key={payment.id} className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold dark:text-white">{payment.user?.name || payment.user?.email}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{payment.user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-800 border-yellow-400/40 dark:bg-yellow-500/20 dark:text-yellow-200 dark:border-yellow-500/30">
                                {getPlanName(payment.plan)}
                              </Badge>
                              <span className="text-sm font-medium dark:text-white">{formatCurrency(payment.amount)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {payment.transactionHash && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://solscan.io/tx/${payment.transactionHash}`, '_blank')}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver TX
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                            onClick={() => handlePaymentAction(payment.id, 'approve')}
                            disabled={isLoading}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                            onClick={() => handlePaymentAction(payment.id, 'reject')}
                            disabled={isLoading}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleDeletePayment(payment.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <p><strong>Criado em:</strong> {formatDate(payment.createdAt)}</p>
                        <p><strong>Válido até:</strong> {formatDate(payment.validUntil)}</p>
                        {payment.transactionHash && (
                          <p><strong>Hash:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{payment.transactionHash}</code></p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Histórico de Pagamentos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Histórico de Pagamentos
            </h2>
            
            {processedPayments.length === 0 ? (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Nenhum pagamento processado</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Os pagamentos aprovados ou rejeitados aparecerão aqui.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {processedPayments.map((payment) => (
                  <Card key={payment.id} className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold dark:text-white">{payment.user?.name || payment.user?.email}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{payment.user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-800 border-yellow-400/40 dark:bg-yellow-500/20 dark:text-yellow-200 dark:border-yellow-500/30">
                                {getPlanName(payment.plan)}
                              </Badge>
                              <span className="text-sm font-medium dark:text-white">{formatCurrency(payment.amount)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(payment.status)}
                          {payment.transactionHash && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://solscan.io/tx/${payment.transactionHash}`, '_blank')}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver TX
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleDeletePayment(payment.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <p><strong>Criado em:</strong> {formatDate(payment.createdAt)}</p>
                        {payment.verifiedAt && (
                          <p><strong>Processado em:</strong> {formatDate(payment.verifiedAt)}</p>
                        )}
                        <p><strong>Válido até:</strong> {formatDate(payment.validUntil)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 