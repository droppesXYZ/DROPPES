'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { APP_NAME } from '@/lib/constants'
import dynamic from 'next/dynamic'
import { 
  User, 
  Settings, 
  LogOut, 
  Crown, 
  Menu, 
  X,
  Shield,
  Calendar
} from 'lucide-react'

const ThemeToggle = dynamic(() => import('@/components/ui/theme-toggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="h-8 w-8" />
})

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/')
  }

  const getUserInitials = (name: string | null | undefined, email: string | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    if (email) {
      return email.substring(0, 2).toUpperCase()
    }
    return 'U' // fallback para "User"
  }

  const isPremium = user?.isPremium && user?.premiumUntil && new Date(user.premiumUntil) > new Date()

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  const navLinkClass = (href: string) => {
    const isActive = isActiveLink(href)
    return `relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
      isActive 
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30'
    }`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 mr-8">
          <Image 
            src="/droppes.png" 
            alt="Droppes Logo" 
            width={32} 
            height={32}
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-2">
          {isAuthenticated && (
            <>
              <Link 
                href="/dashboard" 
                className={navLinkClass('/dashboard')}
              >
                Dashboard
              </Link>
              <Link 
                href="/calendar" 
                className={navLinkClass('/calendar')}
              >
                Calendário
              </Link>
              <Link 
                href="/pricing" 
                className={navLinkClass('/pricing')}
              >
                Planos
              </Link>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {isAuthenticated && user ? (
            <>
              {/* Premium Badge */}
              {isPremium && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={undefined} alt={user.name || user.email} />
                      <AvatarFallback>
                        {getUserInitials(user.name, user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || 'Usuário'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calendar" className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Calendário</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Painel Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer">
                        <Crown className="mr-2 h-4 w-4" />
                        <span>Upgrade Premium</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2 sm:px-3 bg-background border-t">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`block ${navLinkClass('/dashboard')} w-full text-left`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/calendar"
                  className={`block ${navLinkClass('/calendar')} w-full text-left`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Calendário
                </Link>
                <Link
                  href="/pricing"
                  className={`block ${navLinkClass('/pricing')} w-full text-left`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Planos
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block ${navLinkClass('/login')} w-full text-left`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className={`block ${navLinkClass('/register')} w-full text-left`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 