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
import { useUser, useStackApp } from '@stackframe/stack'
import { APP_NAME } from '@/lib/constants'
import { 
  User, 
  Settings, 
  LogOut, 
  Crown, 
  Menu, 
  X,
  Shield,
  Calendar,
  Home,
  ChevronDown,
  BarChart3,
  CalendarDays,
  Zap
} from 'lucide-react'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const stackUser = useUser()
  const stackApp = useStackApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await stackUser?.signOut()
      logout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
    router.push('/')
  }

  const getUserInitials = (name: string | null | undefined, email: string | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    if (email) {
      return email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const isPremium = user?.isPremium && user?.premiumUntil && new Date(user.premiumUntil) > new Date()

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  const navLinkClass = (href: string) => {
    const isActive = isActiveLink(href)
    return `relative px-5 py-2 text-sm font-medium transition-all duration-200 rounded-xl ${
      isActive 
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' 
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-full mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/droppes.png" 
              alt="Droppes Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gradient-animate">
              {APP_NAME}
            </span>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={navLinkClass('/')}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  href="/dashboard" 
                  className={navLinkClass('/dashboard')}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link 
                  href="/calendar" 
                  className={navLinkClass('/calendar')}
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>Calendário</span>
                  </div>
                </Link>
              </>
            )}
            
            <Link 
              href="/pricing" 
              className={navLinkClass('/pricing')}
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span>Planos</span>
              </div>
            </Link>
          </nav>

          {/* Right side - User area */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Premium Badge */}
                {isPremium && (
                  <Badge className="hidden sm:flex border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-2 h-10 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={undefined} alt={user.name || user.email} />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {getUserInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {user.name?.split(' ')[0] || 'Usuário'}
                      </span>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-white">
                          {user.name || 'Usuário'}
                        </p>
                        <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                        {isPremium ? (
                          <Badge className="w-fit mt-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge className="w-fit mt-1 border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            Free
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/" className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </DropdownMenuItem>
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
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* Login/Register buttons */
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl" 
                  asChild
                >
                  <Link href="/login">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Entrar</span>
                    </div>
                  </Link>
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4" 
                  asChild
                >
                  <Link href="/register">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Cadastrar</span>
                    </div>
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="py-4 space-y-3">
              <Link
                href="/"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActiveLink('/') 
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActiveLink('/dashboard') 
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' 
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5 mr-3" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/calendar"
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActiveLink('/calendar') 
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' 
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CalendarDays className="w-5 h-5 mr-3" />
                    <span>Calendário</span>
                  </Link>
                </>
              )}
              
              <Link
                href="/pricing"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActiveLink('/pricing') 
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Crown className="w-5 h-5 mr-3" />
                <span>Planos</span>
              </Link>

              {!isAuthenticated && (
                <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800/50 space-y-3">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    <span>Cadastrar</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 