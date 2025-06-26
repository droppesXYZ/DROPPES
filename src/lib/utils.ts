import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Gerar código 2FA de 6 dígitos
export function generate2FACode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Verificar se uma data expirou
export function isExpired(date: Date): boolean {
  return new Date() > date
}

// Adicionar minutos a uma data
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000)
}

// Função para obter um cookie pelo nome
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

// Utilitários de data
export function isDatePassed(date: Date): boolean {
  return new Date() > date
}

/**
 * Cria uma data local a partir de uma string de data (YYYY-MM-DD)
 * Evita problemas de fuso horário tratando a data como local
 */
export function createLocalDate(dateString: string): Date {
  // Se já tem horário, usar como está
  if (dateString.includes('T')) {
    return new Date(dateString)
  }
  
  // Para datas apenas (YYYY-MM-DD), criar como data local
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // month é 0-indexed
}

/**
 * Cria uma data com início do dia no fuso local
 * Garante que a data seja tratada como local, evitando problemas de fuso horário
 */
export function createLocalStartOfDay(dateString: string): Date {
  // Se já contém horário, extrair apenas a parte da data
  const datePart = dateString.includes('T') ? dateString.split('T')[0] : dateString
  
  const [year, month, day] = datePart.split('-').map(Number)
  
  // Criar data local sem conversão de fuso horário
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

/**
 * Formata uma data para string no formato YYYY-MM-DD
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Obtém a data atual no formato YYYY-MM-DD (local)
 */
export function getTodayString(): string {
  return formatDateToString(new Date())
}

/**
 * Formata uma data para input type="date" garantindo horário local
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Converte uma data para exibição em português brasileiro (local)
 */
export function formatDateForDisplay(date: Date | string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('pt-BR')
}

/**
 * Limpa completamente o estado de autenticação
 */
export function clearAuthState(): void {
  // Limpar cookie
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  
  // Limpar localStorage do Zustand
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-storage')
  }
}
