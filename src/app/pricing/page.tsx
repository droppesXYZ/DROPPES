'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore, useUIStore } from '@/lib/store'
import { PRICING_PLANS, PAYMENT_WALLET_ADDRESS } from '@/lib/constants'
import { PaymentPlan } from '@/lib/types'
import { 
  Check, 
  Crown, 
  Star, 
  Copy, 
  ExternalLink,
  Zap,
  Shield,
  Sparkles,
  ArrowLeft
} from 'lucide-react'

export default function PricingPage() {
  const { isAuthenticated } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')

  const handlePlanSelect = (planId: PaymentPlan) => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    
    setSelectedPlan(planId)
    setIsPaymentDialogOpen(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Adicionar toast de sucesso
  }

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  const selectedPlanData = selectedPlan ? PRICING_PLANS.find(p => p.id === selectedPlan) : null

  const handlePaymentSubmit = async () => {
    if (!selectedPlan || !transactionHash) return

    setLoading(true)
    clearError()

    try {
      const token = getCookie('token')
      console.log('Token obtido:', token ? 'Token existe' : 'Token não encontrado')
      console.log('Enviando pagamento:', { plan: selectedPlan, transactionHash })
      
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plan: selectedPlan,
          transactionHash
        })
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      const data = await response.json()

      if (response.ok) {
        // Sucesso - mostrar mensagem e fechar modal
        alert('Pagamento enviado com sucesso! Aguarde a verificação do administrador.')
        setIsPaymentDialogOpen(false)
        setTransactionHash('')
        setSelectedPlan(null)
      } else {
        setError(data.error || 'Erro ao enviar pagamento')
      }
    } catch (error) {
      console.error('Erro ao enviar pagamento:', error)
      setError('Erro ao enviar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          {/* Botão Voltar no canto esquerdo */}
          <div className="flex justify-start mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
          
          {/* Título e descrição centralizados */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Planos Premium
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Desbloqueie o potencial completo do Droppes com protocolos ilimitados, 
              missões diárias e muito mais!
            </p>
            
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>Protocolos ilimitados</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Shield className="h-5 w-5" />
                <span>Suporte prioritário</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <span>Funcionalidades exclusivas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {PRICING_PLANS.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${
                index === 1 ? 'border-2 border-yellow-400 scale-105' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Mais Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${index === 1 ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
                
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <div className="text-left">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${plan.originalPrice}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">USDC/USDT</div>
                  </div>
                </div>
                
                {plan.discount && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mt-2">
                    {plan.discount}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                                 <ul className="space-y-3">
                   {plan.features.map((feature: string, featureIndex: number) => (
                     <li key={featureIndex} className="flex items-center space-x-2">
                       <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                       <span className="text-sm">{feature}</span>
                     </li>
                   ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    index === 1 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600' 
                      : ''
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isAuthenticated ? 'Escolher Plano' : 'Fazer Login'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de Pagamento */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pagamento - {selectedPlanData?.name}</DialogTitle>
              <DialogDescription>
                Complete o pagamento para ativar seu plano premium
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informações do pagamento */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Valor:</span>
                  <span className="text-lg font-bold">${selectedPlanData?.price} USDC/USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Rede:</span>
                  <span>Solana</span>
                </div>
              </div>

              {/* Endereço da carteira */}
              <div className="space-y-2">
                <Label>Endereço da Carteira (Solana)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={PAYMENT_WALLET_ADDRESS}
                    readOnly
                    className="font-mono text-xs break-all"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_WALLET_ADDRESS)}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hash da transação */}
              <div className="space-y-2">
                <Label htmlFor="transactionHash">
                  Hash da Transação *
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="transactionHash"
                    placeholder="Cole o hash ou link do Solscan aqui"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    required
                    className="flex-1"
                  />
                  {transactionHash && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        let hash = transactionHash.trim()
                        if (hash.includes('solscan.io/tx/')) {
                          const match = hash.match(/solscan\.io\/tx\/([a-zA-Z0-9]+)/)
                          if (match && match[1]) hash = match[1]
                        }
                        window.open(`https://solscan.io/tx/${hash}`, '_blank')
                      }}
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground space-y-2 bg-blue-50 p-3 rounded-md">
                  <p className="font-medium">Após fazer o pagamento, cole aqui:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-700">• Hash direto:</p>
                      <code className="text-xs bg-white p-1 rounded border block break-all">
                        5J7x8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9xY0z
                      </code>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">• Link Solscan:</p>
                      <code className="text-xs bg-white p-1 rounded border block break-all">
                        https://solscan.io/tx/5J7x8K9mN2pQ3rS4tU5vW6x...
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
            </div>

            <DialogFooter className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPaymentDialogOpen(false)
                  setTransactionHash('')
                  setSelectedPlan(null)
                  clearError()
                }}
              >
                Cancelar
              </Button>
              <Button
                disabled={!transactionHash || isLoading}
                onClick={handlePaymentSubmit}
              >
                {isLoading ? 'Enviando...' : 'Enviar Pagamento'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 