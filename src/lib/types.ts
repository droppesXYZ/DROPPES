// Definições de tipos básicos
export enum InvestmentType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW'
}

export enum PaymentPlan {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export interface User {
  id: string
  email: string
  password: string
  name?: string | null
  isPremium: boolean
  premiumUntil?: Date | null
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Protocol {
  id: string
  name: string
  network: string
  officialUrl: string
  twitterHandle?: string | null
  farmStartDate?: Date | null
  dailyMissions: boolean
  logoUrl?: string | null
  primaryColor?: string | null
  textColor?: string | null
  totalInvested: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  pendingTasks?: number
}

export interface ProtocolLink {
  id: string
  title: string
  url: string
  description?: string | null
  amount?: number | null
  createdAt: Date
  updatedAt: Date
  protocolId: string
}

export interface Investment {
  id: string
  amount: number
  type: InvestmentType
  date: Date
  description?: string | null
  createdAt: Date
  protocolId: string
}

export interface Task {
  id: string
  title: string
  description?: string | null
  isCompleted: boolean
  isDaily: boolean
  dueDate?: Date | null
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  userId: string
  protocolId?: string | null
}

export interface Payment {
  id: string
  plan: PaymentPlan
  amount: number
  transactionHash?: string | null
  status: PaymentStatus
  verifiedAt?: Date | null
  validUntil: Date
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface Airdrop {
  id: string
  ticker: string
  quantity: number
  tokenPrice: number
  totalValue: number
  date: Date
  createdAt: Date
  protocolId: string
}

export type UserWithProtocols = User & {
  protocols: Protocol[]
  _count: {
    protocols: number
  }
}

export type ProtocolWithInvestments = Protocol & {
  investments: Investment[]
  tasks: Task[]
  _sum: {
    investments: {
      amount: number | null
    }
  }
}

export type TaskWithProtocol = Task & {
  protocol?: Protocol | null
}

export type PaymentWithUser = Payment & {
  user: User
}

export interface TwitterTweet {
  id: string
  text: string
  created_at: string
  author_id: string
  public_metrics: {
    retweet_count: number
    like_count: number
    reply_count: number
  }
}

export interface TwitterCacheData {
  tweets: TwitterTweet[]
  lastUpdated: string
}

export interface PricingPlan {
  id: PaymentPlan
  name: string
  price: number
  originalPrice?: number
  discount?: string
  duration: string
  features: string[]
}

export interface DashboardStats {
  totalProtocols: number
  totalInvested: number
  pendingTasks: number
  completedTasks: number
}

export interface TwoFactorCode {
  id: string
  userId: string
  code: string
  expiresAt: Date
  isUsed: boolean
  createdAt: Date
}

// Tipos para o Calendário
export enum CalendarEventType {
  ALLOCATION_CHECK = 'ALLOCATION_CHECK',
  TOKEN_CLAIM = 'TOKEN_CLAIM',
  TGE = 'TGE',
  TASK_REMINDER = 'TASK_REMINDER',
  CUSTOM = 'CUSTOM'
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string | null
  date: Date
  type: CalendarEventType
  protocolId?: string | null
  protocol?: Protocol | null
  isCompleted: boolean
  reminderEnabled: boolean
  reminderDays?: number | null
  createdAt: Date
  updatedAt: Date
  userId: string
}

 