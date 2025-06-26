import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { userService } from './firestore'
import type { User } from './types'

// ✅ MELHORIA: Verificar se JWT_SECRET existe em produção
const JWT_SECRET = process.env.JWT_SECRET
const isProduction = process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL?.includes('-')

if (!JWT_SECRET) {
  if (isProduction) {
    throw new Error('JWT_SECRET is required in production')
  }
  console.warn('⚠️  JWT_SECRET não configurado. Usando fallback para preview/desenvolvimento.')
}

const FALLBACK_SECRET = 'development-secret-key-change-in-production-88c5440b7469040a37334518be224a2c'
const secret = JWT_SECRET || FALLBACK_SECRET

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export interface TokenPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyAuth(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret) as TokenPayload
  } catch {
    return null
  }
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  const token = request.cookies.get('token')?.value
  if (!token) return null

  const decoded = verifyAuth(token)
  if (!decoded) return null

  const user = await userService.findById(decoded.userId)

  return user
}

export async function requireAuth(request: NextRequest): Promise<User> {
  const user = await getCurrentUser(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin(request: NextRequest): Promise<User> {
  const user = await requireAuth(request)
  if (!user.isAdmin) {
    throw new Error('Admin access required')
  }
  return user
}

export function isUserPremium(user: User): boolean {
  if (!user.isPremium) return false
  if (!user.premiumUntil) return false
  return new Date() < new Date(user.premiumUntil)
}

export function getUserFromCookie(cookieValue: string): TokenPayload | null {
  try {
    return verifyAuth(cookieValue)
  } catch {
    return null
  }
} 