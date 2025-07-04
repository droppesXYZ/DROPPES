'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore, useUIStore } from '@/lib/store'
import { PRICING_PLANS, AFFILIATE_PRICING_PLANS, PAYMENT_WALLET_ADDRESS, AFFILIATE_DISCOUNT_PERCENTAGE } from '@/lib/constants'
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
  Tag,
  CheckCircle
} from 'lucide-react'

interface ValidatedCode {
  id: string;
  code: string;
  influencerName: string;
  isValid: boolean;
}

export default function PricingPage() {
  const { isAuthenticated } = useAuthStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [validatedCode, setValidatedCode] = useState<ValidatedCode | null>(null)
  const [showDiscountPlans, setShowDiscountPlans] = useState(false)

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

  const handleAffiliateCodeChange = async (code: string) => {
    setAffiliateCode(code)
    setValidatedCode(null)
    setShowDiscountPlans(false)
    
    if (!code.trim()) return

    setIsValidatingCode(true)
    
    try {
      const response = await fetch('/api/affiliate-codes/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim() })
      })

      if (response.ok) {
        const data = await response.json()
        setValidatedCode(data)
        setShowDiscountPlans(true)
      } else {
        setValidatedCode(null)
        setShowDiscountPlans(false)
      }
    } catch (error) {
      console.error('Erro ao validar código:', error)
      setValidatedCode(null)
      setShowDiscountPlans(false)
    } finally {
      setIsValidatingCode(false)
    }
  }

  const selectedPlanData = selectedPlan ? 
    (validatedCode ? AFFILIATE_PRICING_PLANS : PRICING_PLANS).find(p => p.id === selectedPlan) : null

  const handlePaymentSubmit = async () => {
    if (!selectedPlan || !transactionHash) return

    setLoading(true)
    clearError()

    try {
      const token = getCookie('token')
      console.log('Token obtido:', token ? 'Token existe' : 'Token não encontrado')
      console.log('Enviando pagamento:', { plan: selectedPlan, transactionHash, affiliateCode: validatedCode?.code })
      
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plan: selectedPlan,
          transactionHash,
          affiliateCode: validatedCode?.code || null
        })
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      const data = await response.json()

      if (response.ok) {
        // Sucesso - mostrar mensagem e fechar modal
        const message = validatedCode 
          ? `Pagamento enviado com sucesso! Desconto de ${AFFILIATE_DISCOUNT_PERCENTAGE}% aplicado. Aguarde a verificação do administrador.`
          : 'Pagamento enviado com sucesso! Aguarde a verificação do administrador.'
        alert(message)
        setIsPaymentDialogOpen(false)
        setTransactionHash('')
        setSelectedPlan(null)
        setAffiliateCode('')
        setValidatedCode(null)
        setShowDiscountPlans(false)
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

  const displayPlans = showDiscountPlans && validatedCode ? AFFILIATE_PRICING_PLANS : PRICING_PLANS

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 py-8 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <div className="mb-12">
          {/* Título e descrição centralizados */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-bold text-white">
                Planos Premium
              </h1>
            </div>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Desbloqueie o potencial completo do Droppes com protocolos ilimitados, 
              missões diárias e muito mais!
            </p>
            
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Check className="h-5 w-5" />
                <span className="text-slate-300">Protocolos ilimitados</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Shield className="h-5 w-5" />
                <span className="text-slate-300">Suporte prioritário</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
                <span className="text-slate-300">Funcionalidades exclusivas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campo de código de afiliado */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-lg p-4">
            <Label htmlFor="affiliate-code" className="text-slate-300 flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4" />
              Código de Afiliado (Opcional)
            </Label>
            <div className="flex gap-2">
              <Input
                id="affiliate-code"
                placeholder="Ex: JOHN20, CRIPTOANA"
                value={affiliateCode}
                onChange={(e) => handleAffiliateCodeChange(e.target.value)}
                className="flex-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
              />
              {isValidatingCode && (
                <div className="flex items-center px-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                </div>
              )}
            </div>
            {validatedCode && (
              <div className="mt-2 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="h-4 w-4" />
                Código válido! Desconto de {AFFILIATE_DISCOUNT_PERCENTAGE}% será aplicado.
                <span className="text-slate-400">({validatedCode.influencerName})</span>
              </div>
            )}
            {affiliateCode && !validatedCode && !isValidatingCode && (
              <div className="mt-2 text-red-400 text-sm">
                Código inválido ou inativo
              </div>
            )}
          </div>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {displayPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden bg-slate-900/50 border-slate-200/10 backdrop-blur-lg ${
                index === 1 ? 'border-2 border-yellow-400 scale-105' : ''
              } ${validatedCode ? 'border-green-400 border-2' : ''}`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Mais Popular
                </div>
              )}
              
              {validatedCode && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-1 text-xs font-medium">
                  Desconto de Afiliado Aplicado!
                </div>
              )}
              
              <CardHeader className={`text-center ${index === 1 || validatedCode ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-300">{plan.duration}</CardDescription>
                
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <div className="text-left">
                    {plan.originalPrice && (
                      <div className="text-sm text-slate-400 line-through">
                        ${plan.originalPrice}
                      </div>
                    )}
                    <div className="text-sm text-slate-300">USDC/USDT</div>
                  </div>
                </div>
                
                {plan.discount && (
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 mt-2">
                    {plan.discount}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                   {plan.features.map((feature: string, featureIndex: number) => (
                     <li key={featureIndex} className="flex items-center space-x-2">
                       <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                       <span className="text-sm text-slate-300">{feature}</span>
                     </li>
                   ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    validatedCode
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                      : index === 1 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
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
      </div>

        {/* Dialog de Pagamento */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900/95 border-slate-700 backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle className="text-white">
                Pagamento - {selectedPlanData?.name}
                {validatedCode && (
                  <Badge className="ml-2 bg-green-600 text-white">
                    Desconto Aplicado
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                Complete o pagamento para ativar seu plano premium
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informações do pagamento */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                {validatedCode && selectedPlanData && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-300">Valor original:</span>
                    <span className="text-slate-400 line-through">${selectedPlanData.originalPrice} USDC/USDT</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-300">
                    {validatedCode ? 'Valor final:' : 'Valor:'}
                  </span>
                  <span className="text-lg font-bold text-white">${selectedPlanData?.price} USDC/USDT</span>
                </div>
                {validatedCode && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-400">Economia:</span>
                    <span className="text-green-400 font-bold">
                      ${((selectedPlanData?.originalPrice || 0) - (selectedPlanData?.price || 0)).toFixed(2)} 
                      ({AFFILIATE_DISCOUNT_PERCENTAGE}% OFF)
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-300">Rede:</span>
                  <span className="text-slate-300">Solana</span>
                </div>
                {validatedCode && (
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                      <Tag className="h-4 w-4" />
                      Código: {validatedCode.code} ({validatedCode.influencerName})
                    </div>
                  </div>
                )}
              </div>

              {/* Endereço da carteira */}
              <div className="space-y-2">
                <Label className="text-slate-300">Endereço da Carteira (Solana)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={PAYMENT_WALLET_ADDRESS}
                    readOnly
                    className="font-mono text-xs break-all bg-slate-800/50 border-slate-700 text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_WALLET_ADDRESS)}
                    className="flex-shrink-0 border-slate-700 text-slate-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hash da transação */}
              <div className="space-y-2">
                <Label htmlFor="transactionHash" className="text-slate-300">
                  Hash da Transação *
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="transactionHash"
                    placeholder="Cole o hash ou link do Solscan aqui"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    required
                    className="flex-1 bg-slate-800/50 border-slate-700 text-white"
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
                      className="flex-shrink-0 border-slate-700 text-slate-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-sm text-slate-400 space-y-2 bg-blue-900/20 p-3 rounded-md border border-blue-800">
                  <p className="font-medium text-slate-300">Após fazer o pagamento, cole aqui:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-slate-300">• Hash direto:</p>
                      <code className="text-xs bg-slate-800 p-1 rounded border border-slate-700 block break-all text-slate-200">
                        5J7x8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9xY0z
                      </code>
                    </div>
                    <div>
                      <p className="font-medium text-slate-300">• Link Solscan:</p>
                      <code className="text-xs bg-slate-800 p-1 rounded border border-slate-700 block break-all text-slate-200">
                        https://solscan.io/tx/5J7x8K9mN2pQ3rS4tU5vW6x...
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
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
                className="border-slate-700 text-slate-300"
              >
                Cancelar
              </Button>
              <Button
                disabled={!transactionHash || isLoading}
                onClick={handlePaymentSubmit}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                {isLoading ? 'Enviando...' : 'Enviar Pagamento'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  )
} 