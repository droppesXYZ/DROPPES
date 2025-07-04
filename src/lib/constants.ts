import { PaymentPlan } from './types'
import type { PricingPlan } from './types'

export const APP_NAME = 'Droppes'
export const APP_DESCRIPTION = 'Manage your DeFi protocols and farming activities'

// Limites de protocolos
export const FREE_PROTOCOL_LIMIT = 3
export const PREMIUM_PROTOCOL_LIMIT = 999
export const PREMIUM_PRICE_USD = 10

// Planos de preços
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: PaymentPlan.MONTHLY,
    name: 'Mensal',
    price: 5.00,
    duration: '1 mês',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
    ],
  },
  {
    id: PaymentPlan.QUARTERLY,
    name: 'Trimestral',
    price: 13.50,
    originalPrice: 15.00,
    discount: '10% OFF',
    duration: '3 meses',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
      'Economia de 10%',
    ],
  },
  {
    id: PaymentPlan.SEMI_ANNUAL,
    name: 'Semestral',
    price: 24.00,
    originalPrice: 30.00,
    discount: '20% OFF',
    duration: '6 meses',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
      'Economia de 20%',
      'Melhor valor',
    ],
  },
]

// Preços com desconto de afiliado (20% de desconto adicional)
export const AFFILIATE_PRICING_PLANS: PricingPlan[] = [
  {
    id: PaymentPlan.MONTHLY,
    name: 'Mensal',
    price: 4.00,
    originalPrice: 5.00,
    discount: '20% OFF',
    duration: '1 mês',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
      'Desconto de afiliado aplicado',
    ],
  },
  {
    id: PaymentPlan.QUARTERLY,
    name: 'Trimestral',
    price: 10.80,
    originalPrice: 13.50,
    discount: '20% OFF adicional',
    duration: '3 meses',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
      'Economia de 10% + 20% afiliado',
      'Desconto de afiliado aplicado',
    ],
  },
  {
    id: PaymentPlan.SEMI_ANNUAL,
    name: 'Semestral',
    price: 19.20,
    originalPrice: 24.00,
    discount: '20% OFF adicional',
    duration: '6 meses',
    features: [
      'Protocolos ilimitados',
      'Missões diárias',
      'Histórico de investimentos',
      'Feed do Twitter',
      'Suporte prioritário',
      'Economia de 20% + 20% afiliado',
      'Melhor valor',
      'Desconto de afiliado aplicado',
    ],
  },
]

// Constantes do sistema de afiliados
export const AFFILIATE_DISCOUNT_PERCENTAGE = 20
export const AFFILIATE_COMMISSION_PERCENTAGE = 30

// Endereço de pagamento (deve ser público)
export const PAYMENT_WALLET_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS || 'Dm5ThWMqJ6HgroFJuaw7EhWq9ZmctuDSf5DAuaPvfp73'

// Redes blockchain suportadas
export const SUPPORTED_NETWORKS = [
  'Ethereum',
  'Binance Smart Chain (BSC)',
  'Polygon',
  'Arbitrum',
  'Optimism',
  'Avalanche',
  'Solana',
  'Cardano',
  'Polkadot',
  'Cosmos',
  'Near',
  'Fantom',
  'Cronos',
  'Harmony',
  'Moonbeam',
  'Celo',
  'Gnosis',
  'Kava',
  'Osmosis',
  'Injective',
  'Outra'
] as const

export type NetworkType = typeof SUPPORTED_NETWORKS[number]

// Cores padrão para protocolos
export const DEFAULT_PROTOCOL_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#F97316', // orange-500
  '#84CC16', // lime-500
  '#EC4899', // pink-500
  '#6366F1', // indigo-500
] as const

// Mensagens de erro
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  USER_NOT_FOUND: 'Usuário não encontrado',
  EMAIL_ALREADY_EXISTS: 'Este email já está em uso',
  WEAK_PASSWORD: 'A senha deve ter pelo menos 6 caracteres',
  INVALID_EMAIL: 'Email inválido',
  PROTOCOL_LIMIT_REACHED: 'Limite de protocolos atingido. Faça upgrade para Premium',
  UNAUTHORIZED: 'Não autorizado',
  ADMIN_REQUIRED: 'Acesso de administrador necessário',
  PAYMENT_VERIFICATION_FAILED: 'Falha na verificação do pagamento',
} as const 