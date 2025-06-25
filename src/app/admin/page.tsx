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
  AlertTriangle
} from 'lucide-react'

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

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  const fetchPayments = useCallback(async () => {
    setLoading(true)
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/admin/payments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
  }, [setLoading, setError, setPayments])

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
      const token = getCookie('token')
      
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingPayments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Aguardando aprovação
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Pagamentos</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{payments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Todos os pagamentos
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(payments.filter(p => p.status === PaymentStatus.VERIFIED).reduce((sum, p) => sum + p.amount, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">
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
                  <Card key={payment.id} className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{payment.user?.name || payment.user?.email}</h3>
                            <p className="text-sm text-gray-600">{payment.user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{getPlanName(payment.plan)}</Badge>
                              <span className="text-sm font-medium">{formatCurrency(payment.amount)}</span>
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
                            className="border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => handlePaymentAction(payment.id, 'approve')}
                            disabled={isLoading}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handlePaymentAction(payment.id, 'reject')}
                            disabled={isLoading}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Criado em:</strong> {formatDate(payment.createdAt)}</p>
                        <p><strong>Válido até:</strong> {formatDate(payment.validUntil)}</p>
                        {payment.transactionHash && (
                          <p><strong>Hash:</strong> <code className="bg-gray-100 px-1 rounded">{payment.transactionHash}</code></p>
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
              <Card>
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum pagamento processado</h3>
                  <p className="text-gray-600">
                    Os pagamentos aprovados ou rejeitados aparecerão aqui.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {processedPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{payment.user?.name || payment.user?.email}</h3>
                            <p className="text-sm text-gray-600">{payment.user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{getPlanName(payment.plan)}</Badge>
                              <span className="text-sm font-medium">{formatCurrency(payment.amount)}</span>
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
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-600">
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
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
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
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Carregando...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 