'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  // Determina o tema atual baseado na preferência e no sistema
  const getActualTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme as 'light' | 'dark'
  }

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    
    // Carrega tema salvo do localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const newActualTheme = getActualTheme()
    setActualTheme(newActualTheme)

    // Aplica o tema no documento
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newActualTheme)

    // Salva no localStorage
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return

    // Escuta mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        const newActualTheme = getActualTheme()
        setActualTheme(newActualTheme)
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(newActualTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 