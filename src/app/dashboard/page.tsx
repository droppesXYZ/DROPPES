'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore, useProtocolStore, useUIStore } from '@/lib/store'
import { DashboardStats, Protocol, Investment, Task, Airdrop, ProtocolLink as LinkItem } from '@/lib/types'
import { FREE_PROTOCOL_LIMIT, SUPPORTED_NETWORKS } from '@/lib/constants'
import { isUserPremium } from '@/lib/auth'
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Crown,
  Target,
  Globe,
  Twitter,
  Calendar,
  Gift,
  CircleDot,
  Eye,
  Zap,
  ExternalLink,
  Link as LinkIcon,
  Search,
  Filter,
  RotateCcw,
  Edit2,
  MoreVertical,
  Palette,
  Link2
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const { protocols, setProtocols } = useProtocolStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [stats, setStats] = useState<DashboardStats>({
    totalProtocols: 0,
    totalInvested: 0,
    pendingTasks: 0,
    completedTasks: 0
  })

  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    network: '',
    customNetwork: '',
    officialUrl: '',
    twitterHandle: ''
  })

  // Estados dos novos modais
  const [activeModal, setActiveModal] = useState<'protocol' | 'investment' | 'task' | 'airdrop' | 'details' | 'quick-tasks' | 'edit-protocol' | 'link' | 'edit-link' | 'card-editor' | null>(null)
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol & { linksCount?: number } | null>(null)
  const [protocolDetails, setProtocolDetails] = useState<{
    investments: Investment[]
    tasks: Task[]
    airdrops: Airdrop[]
    links: LinkItem[]
  }>({ investments: [], tasks: [], airdrops: [], links: [] })
  const [investmentForm, setInvestmentForm] = useState({
    type: 'deposit', // 'deposit' ou 'withdrawal'
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    type: 'daily', // 'daily' ou 'weekly'
    dueDate: new Date().toISOString().split('T')[0]
  })
  const [airdropForm, setAirdropForm] = useState({
    ticker: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    tokenPrice: '',
    totalValue: 0
  })
  const [linkForm, setLinkForm] = useState({
    title: '',
    url: '',
    description: '',
    amount: ''
  })
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null)

  // Estados para o editor de cartão
  const [cardEditor, setCardEditor] = useState({
    backgroundColor: '',
    textColor: '',
    websiteUrl: '',
    isLoadingMetadata: false
  })
  const [extractedMetadata, setExtractedMetadata] = useState<{
    logo?: string
    favicon?: string
    title?: string
    description?: string
    colors?: string[]
  } | null>(null)

  // Estados dos filtros
  const [filters, setFilters] = useState({
    search: '',
    status: 'all', // 'all', 'active', 'inactive'
    network: 'all' // 'all', 'Solana', 'Ethereum', etc.
  })

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProtocols(data.protocols || [])
        setStats(data.stats || {
          totalProtocols: 0,
          totalInvested: 0,
          pendingTasks: 0,
          completedTasks: 0
        })
      } else {
        // Se não conseguir carregar dados, usar valores padrão
        setProtocols([])
        setStats({
          totalProtocols: 0,
          totalInvested: 0,
          pendingTasks: 0,
          completedTasks: 0
        })
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      // Usar valores padrão em caso de erro
      setProtocols([])
      setStats({
        totalProtocols: 0,
        totalInvested: 0,
        pendingTasks: 0,
        completedTasks: 0
      })
    } finally {
      setLoading(false)
    }
  }, [setLoading, setProtocols])

  // Verificar autenticação
  useEffect(() => {
    if (!isInitialized) {
      // Aguarda a verificação inicial do AuthProvider
      return
    }
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    fetchDashboardData()
  }, [isAuthenticated, isInitialized, router, fetchDashboardData])

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    const token = parts.length === 2 ? parts.pop()?.split(';').shift() : null
    console.log('Token do cookie:', token) // Debug
    return token
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }

  // Função para filtrar protocolos
  const filteredProtocols = protocols.filter(protocol => {
    // Filtro por busca (nome)
    const matchesSearch = protocol.name.toLowerCase().includes(filters.search.toLowerCase())
    
    // Filtro por status
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'active' && protocol.isActive) ||
      (filters.status === 'inactive' && !protocol.isActive)
    
    // Filtro por rede
    const matchesNetwork = filters.network === 'all' || protocol.network === filters.network
    
    return matchesSearch && matchesStatus && matchesNetwork
  })

  // Função para atualizar filtros
  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Função para limpar filtros
  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      network: 'all'
    })
  }

  // Obter redes únicas dos protocolos
  const uniqueNetworks = [...new Set(protocols.map(protocol => protocol.network))].sort()

  const handleOpenModal = () => {
    if (!user) return;
    const isPremium = isUserPremium(user)
    
    // Verificar limite de protocolos para usuários não premium
    if (!isPremium && protocols.length >= FREE_PROTOCOL_LIMIT) {
      setError('Limite de protocolos atingido. Faça upgrade para Premium para adicionar mais protocolos.')
      return
    }
    
    setActiveModal('protocol')
    setIsModalOpen(true)
    clearError()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setActiveModal(null)
    setSelectedProtocol(null)
    setFormData({
      name: '',
      network: '',
      customNetwork: '',
      officialUrl: '',
      twitterHandle: ''
    })
    // Reset outros formulários
    setInvestmentForm({
      type: 'deposit',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })
    setTaskForm({
      title: '',
      description: '',
      type: 'daily',
      dueDate: new Date().toISOString().split('T')[0]
    })
    setAirdropForm({
      ticker: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      tokenPrice: '',
      totalValue: 0
    })
    setCardEditor({
      backgroundColor: '',
      textColor: '',
      websiteUrl: '',
      isLoadingMetadata: false
    })
    setExtractedMetadata(null)
    clearError()
  }

  const handleOpenSubModal = (type: 'investment' | 'task' | 'airdrop', protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setActiveModal(type)
    setIsModalOpen(true)
    clearError()
  }

  const handleOpenDetailsModal = async (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setActiveModal('details')
    setIsModalOpen(true)
    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      // Buscar investimentos, tasks, airdrops e links em paralelo
      const [investmentsRes, tasksRes, airdropsRes, linksRes] = await Promise.all([
        fetch(`/api/investments?protocolId=${protocol.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`/api/tasks?protocolId=${protocol.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`/api/airdrops?protocolId=${protocol.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`/api/protocols/${protocol.id}/links`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const [investments, tasks, airdrops, links] = await Promise.all([
        investmentsRes.ok ? investmentsRes.json() : [],
        tasksRes.ok ? tasksRes.json() : [],
        airdropsRes.ok ? airdropsRes.json() : [],
        linksRes.ok ? linksRes.json() : []
      ])

      setProtocolDetails({ investments, tasks, airdrops, links })
      
      // Adicionar contagem de links ao protocolo para exibição
      setSelectedProtocol({ ...protocol, linksCount: links.length })
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error)
      setError('Erro ao carregar detalhes do protocolo')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isCompleted: !currentStatus
        })
      })

      if (response.ok) {
        // Atualizar a lista de tasks localmente
        const updatedTasks = protocolDetails.tasks.map(task => 
          task.id === taskId 
            ? { ...task, isCompleted: !currentStatus, completedAt: !currentStatus ? new Date() : null }
            : task
        )
        
        setProtocolDetails({
          ...protocolDetails,
          tasks: updatedTasks
        })

        // Recarregar dados do dashboard para atualizar estatísticas
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar task')
      }
    } catch (error) {
      console.error('Erro ao atualizar task:', error)
      setError('Erro ao atualizar task. Tente novamente.')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAirdropInputChange = (field: string, value: string) => {
    const newForm = { ...airdropForm, [field]: value }
    
    // Calcular valor total automaticamente
    if (field === 'quantity' || field === 'tokenPrice') {
      const quantity = parseFloat(field === 'quantity' ? value : airdropForm.quantity) || 0
      const price = parseFloat(field === 'tokenPrice' ? value : airdropForm.tokenPrice) || 0
      newForm.totalValue = quantity * price
    }
    
    setAirdropForm(newForm)
  }

  const handleProtocolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.network || !formData.officialUrl) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Se selecionou "Outra", verificar se preencheu o nome customizado
    if (formData.network === 'Outra' && !formData.customNetwork) {
      setError('Por favor, digite o nome da rede customizada')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      console.log('Enviando token:', token) // Debug
      
      // Preparar dados para envio
      const networkName = formData.network === 'Outra' ? formData.customNetwork : formData.network
      
      const response = await fetch('/api/protocols', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          network: networkName,
          officialUrl: formData.officialUrl,
          twitterHandle: formData.twitterHandle || null,
          dailyMissions: false,
          totalInvested: 0,
          isActive: true
        })
      })

      if (response.ok) {
        const newProtocol = await response.json()
        setProtocols([...protocols, newProtocol])
        handleCloseModal()
        // Recarregar dados do dashboard
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao criar protocolo')
      }
    } catch (error) {
      console.error('Erro ao criar protocolo:', error)
      setError('Erro ao criar protocolo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!investmentForm.amount || !investmentForm.date) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!selectedProtocol) {
      setError('Protocolo não selecionado.')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: investmentForm.type,
          amount: parseFloat(investmentForm.amount),
          date: investmentForm.date,
          description: investmentForm.description,
          protocolId: selectedProtocol.id
        })
      })

      if (response.ok) {
        const newInvestment = await response.json()
        console.log('Investimento criado:', newInvestment)
        handleCloseModal()
        // Recarregar dados do dashboard para atualizar o valor investido
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao criar investimento')
      }
    } catch (error) {
      console.error('Erro ao criar investimento:', error)
      setError('Erro ao criar investimento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!taskForm.title || !taskForm.dueDate) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!selectedProtocol) {
      setError('Protocolo não selecionado.')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskForm.title,
          description: taskForm.description,
          type: taskForm.type,
          dueDate: taskForm.dueDate,
          protocolId: selectedProtocol.id
        })
      })

      if (response.ok) {
        const newTask = await response.json()
        console.log('Task criada:', newTask)
        handleCloseModal()
        // Recarregar dados do dashboard
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao criar task')
      }
    } catch (error) {
      console.error('Erro ao criar task:', error)
      setError('Erro ao criar task. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleAirdropSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!airdropForm.ticker || !airdropForm.quantity || !airdropForm.tokenPrice) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!selectedProtocol) {
      setError('Protocolo não selecionado.')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch('/api/airdrops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ticker: airdropForm.ticker,
          quantity: parseFloat(airdropForm.quantity),
          tokenPrice: parseFloat(airdropForm.tokenPrice),
          date: airdropForm.date,
          protocolId: selectedProtocol.id
        })
      })

      if (response.ok) {
        const newAirdrop = await response.json()
        console.log('Airdrop criado:', newAirdrop)
        handleCloseModal()
        // Recarregar dados do dashboard
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao registrar airdrop')
      }
    } catch (error) {
      console.error('Erro ao registrar airdrop:', error)
      setError('Erro ao registrar airdrop. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenQuickTasksModal = async (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setActiveModal('quick-tasks')
    setIsModalOpen(true)
    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/tasks?protocolId=${protocol.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const tasks = response.ok ? await response.json() : []
      setProtocolDetails({ ...protocolDetails, tasks })
    } catch (error) {
      console.error('Erro ao buscar tasks:', error)
      setError('Erro ao carregar tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProtocol = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setFormData({
      name: protocol.name,
      network: protocol.network,
      customNetwork: '',
      officialUrl: protocol.officialUrl,
      twitterHandle: protocol.twitterHandle || ''
    })
    setActiveModal('edit-protocol')
    setIsModalOpen(true)
  }

  const handleUpdateProtocol = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.network || !formData.officialUrl) {
      setError('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (!selectedProtocol) {
        setError('Protocolo não selecionado.')
        return
    }

    // Se selecionou "Outra", verificar se preencheu o nome customizado
    if (formData.network === 'Outra' && !formData.customNetwork) {
      setError('Por favor, digite o nome da rede customizada')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      // Preparar dados para envio
      const networkName = formData.network === 'Outra' ? formData.customNetwork : formData.network
      
      const response = await fetch(`/api/protocols/${selectedProtocol.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          network: networkName,
          officialUrl: formData.officialUrl,
          twitterHandle: formData.twitterHandle || null
        })
      })

      if (response.ok) {
        const updatedProtocol = await response.json()
        // Atualizar a lista de protocolos
        setProtocols(protocols.map(p => p.id === selectedProtocol.id ? updatedProtocol : p))
        handleCloseModal()
        // Recarregar dados do dashboard
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar protocolo')
      }
    } catch (error) {
      console.error('Erro ao atualizar protocolo:', error)
      setError('Erro ao atualizar protocolo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProtocol = async (protocol: Protocol) => {
    if (!confirm(`Tem certeza que deseja deletar o protocolo "${protocol.name}"? Esta ação não pode ser desfeita.`)) {
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/protocols/${protocol.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        // Remover protocolo da lista
        setProtocols(protocols.filter(p => p.id !== protocol.id))
        handleCloseModal()
        // Recarregar dados do dashboard
        await fetchDashboardData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao deletar protocolo')
      }
    } catch (error) {
      console.error('Erro ao deletar protocolo:', error)
      setError('Erro ao deletar protocolo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Funções para gerenciar links
  const handleOpenLinkModal = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setLinkForm({
      title: '',
      url: '',
      description: '',
      amount: ''
    })
    setActiveModal('link')
    setIsModalOpen(true)
  }

  const handleEditLink = (link: LinkItem) => {
    setSelectedLink(link)
    setLinkForm({
      title: link.title,
      url: link.url,
      description: link.description || '',
      amount: link.amount?.toString() || ''
    })
    setActiveModal('edit-link')
  }

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!linkForm.title || !linkForm.url) {
      setError('Título e URL são obrigatórios.')
      return
    }

    if (!selectedProtocol) {
      setError('Protocolo não selecionado.')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/protocols/${selectedProtocol.id}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: linkForm.title,
          url: linkForm.url,
          description: linkForm.description || null,
          amount: linkForm.amount ? parseFloat(linkForm.amount) : null
        })
      })

      if (response.ok) {
        // Mostrar mensagem de sucesso
        alert('✅ Link adicionado com sucesso!\n\nVocê pode visualizá-lo clicando em "Ver Detalhes" no cartão do protocolo.')
        // Recarregar detalhes do protocolo
        await handleOpenDetailsModal(selectedProtocol)
        setActiveModal('details')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao adicionar link')
      }
    } catch (error) {
      console.error('Erro ao adicionar link:', error)
      setError('Erro ao adicionar link. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleLinkUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!linkForm.title || !linkForm.url) {
      setError('Título e URL são obrigatórios.')
      return
    }

    if (!selectedProtocol || !selectedLink) {
      setError('Protocolo ou link não selecionado.')
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/protocols/${selectedProtocol.id}/links/${selectedLink.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: linkForm.title,
          url: linkForm.url,
          description: linkForm.description || null,
          amount: linkForm.amount ? parseFloat(linkForm.amount) : null
        })
      })

      if (response.ok) {
        // Recarregar detalhes do protocolo
        await handleOpenDetailsModal(selectedProtocol)
        setActiveModal('details')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar link')
      }
    } catch (error) {
      console.error('Erro ao atualizar link:', error)
      setError('Erro ao atualizar link. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLink = async (link: LinkItem) => {
    if (!selectedProtocol) return
    if (!confirm(`Tem certeza que deseja deletar o link "${link.title}"?`)) {
      return
    }

    setLoading(true)
    
    try {
      const token = getCookie('token')
      
      const response = await fetch(`/api/protocols/${selectedProtocol.id}/links/${link.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        // Recarregar detalhes do protocolo
        await handleOpenDetailsModal(selectedProtocol)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao deletar link')
      }
    } catch (error) {
      console.error('Erro ao deletar link:', error)
      setError('Erro ao deletar link. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Função utilitária para escurecer cores
  const darkenColor = (hex: string, percent: number = 30): string => {
    if (!hex || !hex.startsWith('#')) return '#000000'
    
    const num = parseInt(hex.slice(1), 16)
    const amt = Math.round(2.55 * percent)
    let r = (num >> 16) - amt
    let g = ((num >> 8) & 0x00FF) - amt
    let b = (num & 0x0000FF) - amt
    
    r = Math.max(0, r)
    g = Math.max(0, g)
    b = Math.max(0, b)
    
    return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`
  }

  // Funções para o editor de cartão
  const handleOpenCardEditor = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    const bgColor = protocol.primaryColor || '#ffffff'
    setCardEditor({
      backgroundColor: bgColor,
      textColor: protocol.textColor || darkenColor(bgColor, 40),
      websiteUrl: protocol.officialUrl || '',
      isLoadingMetadata: false
    })
    setExtractedMetadata(null)
    setActiveModal('card-editor')
    setIsModalOpen(true)
  }

  const extractWebsiteMetadata = async (url: string) => {
    setCardEditor(prev => ({ ...prev, isLoadingMetadata: true }))
    
    try {
      // Usar uma API de extração de metadados
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      
      if (data.status === 'success' && data.data) {
        const metadata = {
          logo: data.data.logo?.url,
          favicon: data.data.favicon?.url,
          title: data.data.title,
          description: data.data.description,
          colors: data.data.palette ? data.data.palette.map((color: { color: string }) => color.color) : []
        }
        
        setExtractedMetadata(metadata)
        
        // Auto-aplicar a primeira cor se disponível
        if (metadata.colors && metadata.colors.length > 0) {
          const primaryColor = metadata.colors[0]
          setCardEditor(prev => ({ 
            ...prev, 
            backgroundColor: primaryColor,
            textColor: darkenColor(primaryColor, 50)
          }))
        }
      }
    } catch (error) {
      console.error('Erro ao extrair metadados:', error)
      setError('Erro ao extrair informações do website')
    } finally {
      setCardEditor(prev => ({ ...prev, isLoadingMetadata: false }))
    }
  }

  const handleCardEditorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (!selectedProtocol) {
      setError('Protocolo não selecionado.')
      setLoading(false)
      return
    }

    try {
      const token = getCookie('token')
      
      const updateData = {
        primaryColor: cardEditor.backgroundColor,
        textColor: cardEditor.textColor,
        logoUrl: extractedMetadata?.logo || extractedMetadata?.favicon || selectedProtocol.logoUrl,
        officialUrl: cardEditor.websiteUrl
      }
      
      const response = await fetch(`/api/protocols/${selectedProtocol.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        const updatedProtocol = await response.json()
        
        // Atualizar protocolo na lista
        setProtocols(protocols.map(p => 
          p.id === selectedProtocol.id ? updatedProtocol : p
        ))
        
        handleCloseModal()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar cartão')
      }
    } catch (error) {
      console.error('Erro ao atualizar cartão:', error)
      setError('Erro ao atualizar cartão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isInitialized || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
          <p className="text-gray-600">Verificando autenticação</p>
        </div>
      </div>
    )
  }

  const isPremium = isUserPremium(user)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header do Dashboard */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Bem-vindo de volta, {user.name || user.email}!
                </p>
              </div>
              
              {!isPremium && (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                    <Crown className="w-3 h-3 mr-1" />
                    {protocols.length}/{FREE_PROTOCOL_LIMIT} protocolos
                  </Badge>
                  <Button asChild variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                    <Link href="/pricing">
                      Fazer Upgrade
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Total de Protocolos</CardTitle>
                  <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{stats.totalProtocols}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {isPremium ? 'Ilimitado' : `${Math.max(0, FREE_PROTOCOL_LIMIT - protocols.length)} restantes`}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Total Investido</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{formatCurrency(stats.totalInvested)}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Em todos os protocolos
                  </p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Tarefas Pendentes</CardTitle>
                  <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{stats.pendingTasks}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Requerem atenção
                  </p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800/50 dark:border-gray-700/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Tarefas Concluídas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">{stats.completedTasks}</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Neste mês
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Protocolos */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Meus Protocolos
              </h2>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-gray-200" 
                onClick={handleOpenModal}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Protocolo
              </Button>
            </div>

            {/* Filtros */}
            {protocols.length > 0 && (
              <Card className="mb-6 p-4 dark:bg-gray-800/50 dark:border-gray-700/50">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Campo de busca */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        placeholder="Buscar por nome do protocolo..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="pl-10 dark:bg-gray-700/50 dark:border-gray-600/50 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Filtro por status */}
                  <div className="min-w-[150px]">
                    <select
                      value={filters.status}
                      onChange={(e) => updateFilter('status', e.target.value)}
                      className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600/50 dark:text-white"
                    >
                      <option value="all">Todos os Status</option>
                      <option value="active">Ativos</option>
                      <option value="inactive">Finalizados</option>
                    </select>
                  </div>

                  {/* Filtro por rede */}
                  <div className="min-w-[150px]">
                    <select
                      value={filters.network}
                      onChange={(e) => updateFilter('network', e.target.value)}
                      className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600/50 dark:text-white"
                    >
                      <option value="all">Todas as Redes</option>
                      {uniqueNetworks.map(network => (
                        <option key={network} value={network}>{network}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Informações dos filtros */}
                {(filters.search || filters.status !== 'all' || filters.network !== 'all') && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <Filter className="inline w-4 h-4 mr-1" />
                      Mostrando {filteredProtocols.length} de {protocols.length} protocolos
                      {filters.search && (
                        <span className="ml-2">
                          • Busca: &quot;<span className="font-medium">{filters.search}</span>&quot;
                        </span>
                      )}
                      {filters.status !== 'all' && (
                        <span className="ml-2">
                          • Status: <span className="font-medium">
                            {filters.status === 'active' ? 'Ativos' : 'Finalizados'}
                          </span>
                        </span>
                      )}
                      {filters.network !== 'all' && (
                        <span className="ml-2">
                          • Rede: <span className="font-medium">{filters.network}</span>
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Grid de Protocolos */}
            {protocols.length === 0 ? (
              <Card className="p-8 text-center dark:bg-gray-800/50 dark:border-gray-700/50">
                <div className="flex flex-col items-center space-y-4">
                  <Target className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="text-lg font-semibold dark:text-white">Nenhum protocolo adicionado</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Comece adicionando seu primeiro protocolo DeFi para acompanhar investimentos e tarefas.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleOpenModal}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Protocolo
                  </Button>
                </div>
              </Card>
            ) : filteredProtocols.length === 0 ? (
              <Card className="p-8 text-center dark:bg-gray-800/50 dark:border-gray-700/50">
                <div className="flex flex-col items-center space-y-4">
                  <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="text-lg font-semibold dark:text-white">Nenhum protocolo encontrado</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Não encontramos protocolos que correspondam aos filtros aplicados. 
                    Tente ajustar os critérios de busca.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProtocols.map((protocol) => (
                  <Card 
                    key={protocol.id} 
                    className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] dark:bg-gray-800/50 dark:border-gray-700/50 dark:hover:bg-gray-800/70 dark:hover:shadow-2xl dark:hover:shadow-purple-500/10"
                    style={{ 
                      backgroundColor: protocol.primaryColor ? `${protocol.primaryColor}15` : undefined,
                      borderColor: protocol.primaryColor ? `${protocol.primaryColor}40` : undefined
                    }}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-3">
                          {/* Logo do protocolo */}
                          {protocol.logoUrl && (
                            <div className="relative">
                              <Image 
                                src={protocol.logoUrl} 
                                alt={`${protocol.name} logo`}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            </div>
                          )}
                          <span 
                            className="dark:text-white"
                            style={{ 
                              color: protocol.textColor || 
                                     (protocol.primaryColor ? darkenColor(protocol.primaryColor, 40) : undefined) 
                            }}
                          >
                            {protocol.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50"
                          >
                            {protocol.network}
                          </Badge>
                          <Badge 
                            variant={protocol.isActive ? "default" : "secondary"}
                            className={protocol.isActive 
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50" 
                              : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-600/50"
                            }
                          >
                            <CircleDot className="w-3 h-3 mr-1" />
                            {protocol.isActive ? 'Ativo' : 'Finalizado'}
                          </Badge>
                          {/* Dropdown Menu de 3 pontos */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem 
                                onClick={() => handleOpenCardEditor(protocol)}
                                className="cursor-pointer"
                              >
                                <Palette className="w-4 h-4 mr-2" />
                                Editar Cartão
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEditProtocol(protocol)}
                                className="cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Editar Protocolo
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-green-600 dark:text-green-400">
                        Investido: {formatCurrency(protocol.totalInvested)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 space-y-3">
                      {/* Links Externos */}
                      <div className="flex gap-3">
                        {/* Botão Website */}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`${protocol.twitterHandle ? 'flex-1' : 'w-full'} bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-medium dark:bg-blue-900/20 dark:border-blue-700/50 dark:text-blue-300 dark:hover:bg-blue-900/40 dark:hover:border-blue-600/50`}
                          asChild
                        >
                          <a 
                            href={protocol.officialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            Website
                          </a>
                        </Button>
                        
                        {/* Botão Twitter */}
                        {protocol.twitterHandle && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 hover:border-sky-300 font-medium dark:bg-sky-900/20 dark:border-sky-700/50 dark:text-sky-300 dark:hover:bg-sky-900/40 dark:hover:border-sky-600/50"
                            asChild
                          >
                            <a 
                              href={`https://twitter.com/${protocol.twitterHandle.replace('@', '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Twitter className="w-4 h-4 mr-2" />
                              Twitter
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Botões de Ação */}
                      <div className="mb-3">
                        {/* Primeira linha: Investimento, Tasks, Links */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 font-medium dark:bg-green-900/20 dark:border-green-700/50 dark:text-green-300 dark:hover:bg-green-900/40 dark:hover:border-green-600/50"
                            onClick={() => handleOpenSubModal('investment', protocol)}
                          >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Invests
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 font-medium relative dark:bg-orange-900/20 dark:border-orange-700/50 dark:text-orange-300 dark:hover:bg-orange-900/40 dark:hover:border-orange-600/50"
                            onClick={() => handleOpenQuickTasksModal(protocol)}
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            Tarefas
                            {Number(protocol.pendingTasks) > 0 && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center dark:bg-red-600 dark:text-red-100">
                                {protocol.pendingTasks}
                              </span>
                            )}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-300 font-medium relative dark:bg-yellow-900/20 dark:border-yellow-700/50 dark:text-yellow-300 dark:hover:bg-yellow-900/40 dark:hover:border-yellow-600/50"
                            onClick={() => handleOpenLinkModal(protocol)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Links
                          </Button>
                        </div>
                        
                        {/* Segunda linha: Airdrop centralizado e maior */}
                        <div className="flex justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium w-2/3 min-w-[140px] dark:bg-purple-900/20 dark:border-purple-700/50 dark:text-purple-300 dark:hover:bg-purple-900/40 dark:hover:border-purple-600/50 dark:shadow-purple-500/10"
                            onClick={() => handleOpenSubModal('airdrop', protocol)}
                          >
                            <Gift className="w-4 h-4 mr-1" />
                            Airdrop
                          </Button>
                        </div>
                      </div>

                      {/* Botão Ver Detalhes */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 font-medium dark:bg-gray-800/30 dark:border-gray-600/50 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:border-gray-500/50"
                        onClick={() => handleOpenDetailsModal(protocol)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Seção de boas-vindas para novos usuários */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-700/90" />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                                 <div>
                   <h3 className="text-2xl font-bold">Bem-vindo ao Droppes!</h3>
                   <p className="text-blue-100">Sua plataforma de gerenciamento de airdrops.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Funcionalidades */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    Funcionalidades principais:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <Target className="w-5 h-5 text-blue-200 flex-shrink-0" />
                      <span className="text-sm">Gerencie até {FREE_PROTOCOL_LIMIT} protocolos gratuitamente</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span className="text-sm">Acompanhe investimentos e ROI</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-200 flex-shrink-0" />
                      <span className="text-sm">Organize tarefas diárias</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <Twitter className="w-5 h-5 text-sky-300 flex-shrink-0" />
                      <span className="text-sm">Feed do Twitter integrado</span>
                    </div>
                  </div>
                </div>

                {/* Primeiros Passos */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-300" />
                    Primeiros passos:
                  </h4>
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                      onClick={handleOpenModal}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Adicionar primeiro protocolo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white/70 backdrop-blur-sm font-semibold transition-all duration-200 shadow-lg" 
                      asChild
                    >
                      <Link href="/pricing">
                        <Crown className="w-5 h-5 mr-2" />
                        Ver planos Premium
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100">Progresso da configuração</span>
                  <span className="text-white font-medium">{protocols.length > 0 ? '1/3' : '0/3'} concluído</span>
                </div>
                <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: protocols.length > 0 ? '33%' : '0%' }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-blue-100">
                  <span className={protocols.length > 0 ? 'text-green-300' : ''}>
                    {protocols.length > 0 ? '✓' : '○'} Adicionar protocolo
                  </span>
                  <span>○ Fazer primeiro investimento</span>
                  <span>○ Criar primeira task</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
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

      {/* Modais */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        {activeModal === 'protocol' && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Protocolo</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do protocolo que deseja adicionar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="network" className="text-right">Rede</Label>
                <select
                  id="network"
                  value={formData.network}
                  onChange={(e) => handleInputChange('network', e.target.value)}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione uma rede...</option>
                  {SUPPORTED_NETWORKS.map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>
              </div>
              {formData.network === 'Outra' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customNetwork" className="text-right">Nome da Rede</Label>
                  <Input
                    id="customNetwork"
                    placeholder="Digite o nome da rede..."
                    value={formData.customNetwork}
                    onChange={(e) => handleInputChange('customNetwork', e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="officialUrl" className="text-right">URL Oficial</Label>
                <Input
                  id="officialUrl"
                  value={formData.officialUrl}
                  onChange={(e) => handleInputChange('officialUrl', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitterHandle" className="text-right">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={(e) => handleInputChange('twitterHandle', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleProtocolSubmit}>
                Adicionar Protocolo
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {activeModal === 'edit-protocol' && selectedProtocol && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Protocolo</DialogTitle>
              <DialogDescription>
                Atualize as informações do protocolo {selectedProtocol.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="network" className="text-right">Rede</Label>
                <select
                  id="network"
                  value={formData.network}
                  onChange={(e) => handleInputChange('network', e.target.value)}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione uma rede...</option>
                  {SUPPORTED_NETWORKS.map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>
              </div>
              {formData.network === 'Outra' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customNetwork" className="text-right">Nome da Rede</Label>
                  <Input
                    id="customNetwork"
                    placeholder="Digite o nome da rede..."
                    value={formData.customNetwork}
                    onChange={(e) => handleInputChange('customNetwork', e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="officialUrl" className="text-right">URL Oficial</Label>
                <Input
                  id="officialUrl"
                  value={formData.officialUrl}
                  onChange={(e) => handleInputChange('officialUrl', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitterHandle" className="text-right">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={(e) => handleInputChange('twitterHandle', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleUpdateProtocol}>
                ✏️ Atualizar Protocolo
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {activeModal === 'investment' && selectedProtocol && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Investimento - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Registre um depósito ou retirada no protocolo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Tipo</Label>
                <select
                  id="type"
                  value={investmentForm.type}
                  onChange={(e) => setInvestmentForm({...investmentForm, type: e.target.value as 'deposit' | 'withdrawal'})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="deposit">Depósito</option>
                  <option value="withdrawal">Retirada</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Valor (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={investmentForm.amount}
                  onChange={(e) => setInvestmentForm({...investmentForm, amount: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={investmentForm.date}
                  onChange={(e) => setInvestmentForm({...investmentForm, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Tokens</Label>
                <Textarea
                  id="description"
                  placeholder="Ex: 100 USDC, 0.5 ETH..."
                  value={investmentForm.description}
                  onChange={(e) => setInvestmentForm({...investmentForm, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleInvestmentSubmit}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Adicionar Investimento
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {activeModal === 'task' && selectedProtocol && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Task - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Crie uma missão diária ou semanal para este protocolo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Check-in diário"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Frequência</Label>
                <select
                  id="type"
                  value={taskForm.type}
                  onChange={(e) => setTaskForm({...taskForm, type: e.target.value as 'daily' | 'weekly'})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Data Limite</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva a tarefa..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleTaskSubmit}>
                <Calendar className="w-4 h-4 mr-2" />
                Criar Task
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {activeModal === 'airdrop' && selectedProtocol && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Airdrop - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Registre o recebimento de tokens do airdrop.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticker" className="text-right">Ticker</Label>
                <Input
                  id="ticker"
                  placeholder="Ex: ARB, OP, BLUR..."
                  value={airdropForm.ticker}
                  onChange={(e) => handleAirdropInputChange('ticker', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.000001"
                  value={airdropForm.quantity}
                  onChange={(e) => handleAirdropInputChange('quantity', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tokenPrice" className="text-right">Preço (USD)</Label>
                <Input
                  id="tokenPrice"
                  type="number"
                  step="0.000001"
                  value={airdropForm.tokenPrice}
                  onChange={(e) => handleAirdropInputChange('tokenPrice', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Data TGE</Label>
                <Input
                  id="date"
                  type="date"
                  value={airdropForm.date}
                  onChange={(e) => handleAirdropInputChange('date', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Valor Total</Label>
                <div className="col-span-3 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                  <span className="text-green-700 font-semibold">
                    {formatCurrency(airdropForm.totalValue)}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAirdropSubmit}>
                <Gift className="w-4 h-4 mr-2" />
                Registrar Airdrop
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

                 {activeModal === 'quick-tasks' && selectedProtocol && (
           <DialogContent className="sm:max-w-[500px] max-h-[70vh] overflow-y-auto">
             <DialogHeader>
               <DialogTitle>Tasks - {selectedProtocol.name}</DialogTitle>
               <DialogDescription>
                 Marque as tasks como concluídas clicando nos checkboxes.
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-3 py-4">
               {protocolDetails.tasks.length > 0 ? (
                 protocolDetails.tasks.map((task, index) => (
                   <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                     task.isCompleted 
                       ? 'bg-green-50 border-green-200' 
                       : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                   }`}>
                     {/* Checkbox */}
                     <button
                       onClick={() => handleToggleTask(task.id, task.isCompleted)}
                       className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                         task.isCompleted
                           ? 'bg-green-500 border-green-500 text-white'
                           : 'border-gray-300 hover:border-green-400'
                       }`}
                     >
                       {task.isCompleted && (
                         <CheckCircle className="w-4 h-4" />
                       )}
                     </button>

                     {/* Conteúdo da Task */}
                     <div className="flex-1">
                       <div className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                         {task.title}
                       </div>
                       {task.description && (
                         <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                       )}
                       <div className="text-xs text-gray-400 mt-1">
                         {task.isCompleted && task.completedAt 
                           ? `✅ Concluída em ${new Date(task.completedAt).toLocaleDateString('pt-BR')}`
                           : task.dueDate 
                             ? `📅 Prazo: ${new Date(task.dueDate).toLocaleDateString('pt-BR')}`
                             : '📅 Sem prazo definido'
                         }
                       </div>
                     </div>

                     {/* Badge de Status */}
                     <Badge variant={task.isCompleted ? "default" : "secondary"}>
                       {task.isCompleted ? 'Concluída' : 'Pendente'}
                     </Badge>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-8">
                   <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-500">Nenhuma task criada ainda</p>
                   <Button 
                     variant="outline" 
                     className="mt-3"
                     onClick={() => {
                       if (!selectedProtocol) return;
                       handleCloseModal()
                       handleOpenSubModal('task', selectedProtocol)
                     }}
                   >
                     <Plus className="w-4 h-4 mr-2" />
                     Criar Primeira Task
                   </Button>
                 </div>
               )}
             </div>
             <DialogFooter className="flex justify-between">
               <Button 
                 variant="outline"
                 onClick={() => {
                   if (!selectedProtocol) return;
                   handleCloseModal()
                   handleOpenSubModal('task', selectedProtocol)
                 }}
               >
                 <Plus className="w-4 h-4 mr-2" />
                 Nova Task
               </Button>
               <Button variant="outline" onClick={handleCloseModal}>
                 Fechar
               </Button>
             </DialogFooter>
           </DialogContent>
         )}

         {activeModal === 'details' && selectedProtocol && (
           <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
             <DialogHeader>
               <DialogTitle>Detalhes - {selectedProtocol.name}</DialogTitle>
               <DialogDescription>
                 Resumo completo dos investimentos, tasks e airdrops.
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-6 py-4">
               {/* Resumo Geral */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                   <div className="text-sm text-green-600">Total Investido</div>
                   <div className="text-lg font-bold text-green-700">
                     {formatCurrency(selectedProtocol.totalInvested || 0)}
                   </div>
                 </div>
                 <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                   <div className="text-sm text-blue-600">Tasks Pendentes</div>
                   <div className="text-lg font-bold text-blue-700">
                     {selectedProtocol.pendingTasks || 0}
                   </div>
                 </div>
               </div>

               {/* Investimentos */}
               <div>
                 <h4 className="font-semibold mb-2 flex items-center">
                   <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                   Investimentos ({protocolDetails.investments.length})
                 </h4>
                 {protocolDetails.investments.length > 0 ? (
                   <div className="space-y-2 max-h-32 overflow-y-auto">
                     {protocolDetails.investments.map((investment, index) => (
                       <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                         <div>
                           <span className={`font-medium ${investment.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>
                             {investment.type === 'DEPOSIT' ? '↗️ Depósito' : '↙️ Retirada'}
                           </span>
                           <div className="text-xs text-gray-500">{investment.description}</div>
                         </div>
                         <div className="text-right">
                           <div className={`font-bold ${investment.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>
                             {investment.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(investment.amount)}
                           </div>
                           <div className="text-xs text-gray-500">
                             {new Date(investment.date).toLocaleDateString('pt-BR')}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-500 text-sm">Nenhum investimento registrado</p>
                 )}
               </div>

               {/* Tasks */}
               <div>
                 <h4 className="font-semibold mb-2 flex items-center">
                   <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                   Tasks ({protocolDetails.tasks.length})
                 </h4>
                 {protocolDetails.tasks.length > 0 ? (
                   <div className="space-y-2 max-h-32 overflow-y-auto">
                     {protocolDetails.tasks.map((task, index) => (
                       <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                         task.isCompleted 
                           ? 'bg-green-50 border-green-200' 
                           : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                       }`}>
                         {/* Checkbox */}
                         <button
                           onClick={() => handleToggleTask(task.id, task.isCompleted)}
                           className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                             task.isCompleted
                               ? 'bg-green-500 border-green-500 text-white'
                               : 'border-gray-300 hover:border-green-400'
                           }`}
                         >
                           {task.isCompleted && (
                             <CheckCircle className="w-3 h-3" />
                           )}
                         </button>

                         {/* Conteúdo da Task */}
                         <div className="flex-1">
                           <div className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                             {task.title}
                           </div>
                           {task.description && (
                             <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                           )}
                         </div>

                         {/* Status e Data */}
                         <div className="text-right">
                           <Badge variant={task.isCompleted ? "default" : "secondary"} className="mb-1">
                             {task.isCompleted ? '✅ Concluída' : '⏳ Pendente'}
                           </Badge>
                           <div className="text-xs text-gray-500">
                             {task.isCompleted && task.completedAt 
                               ? `Concluída em ${new Date(task.completedAt).toLocaleDateString('pt-BR')}`
                               : task.dueDate 
                                 ? `Prazo: ${new Date(task.dueDate).toLocaleDateString('pt-BR')}`
                                 : 'Sem prazo'
                             }
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-500 text-sm">Nenhuma task criada</p>
                 )}
               </div>

               {/* Airdrops */}
               <div>
                 <h4 className="font-semibold mb-2 flex items-center">
                   <Gift className="w-4 h-4 mr-2 text-purple-600" />
                   Airdrops ({protocolDetails.airdrops.length})
                 </h4>
                 {protocolDetails.airdrops.length > 0 ? (
                   <div className="space-y-2 max-h-32 overflow-y-auto">
                     {protocolDetails.airdrops.map((airdrop, index) => (
                       <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                         <div>
                           <span className="font-medium text-purple-600">{airdrop.ticker}</span>
                           <div className="text-xs text-gray-500">
                             {airdrop.quantity.toLocaleString()} tokens
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="font-bold text-purple-600">
                             {formatCurrency(airdrop.totalValue)}
                           </div>
                           <div className="text-xs text-gray-500">
                             {new Date(airdrop.date).toLocaleDateString('pt-BR')}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-500 text-sm">Nenhum airdrop registrado</p>
                 )}
               </div>

               {/* Links */}
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-semibold flex items-center">
                     <LinkIcon className="w-4 h-4 mr-2 text-sky-600" />
                     Links Importantes ({protocolDetails.links.length})
                   </h4>
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => {
                       if (!selectedProtocol) return;
                       handleCloseModal()
                       handleOpenLinkModal(selectedProtocol)
                     }}
                   >
                     <Plus className="w-4 h-4 mr-1" />
                     Adicionar Link
                   </Button>
                 </div>
                 {protocolDetails.links.length > 0 ? (
                   <div className="space-y-2 max-h-32 overflow-y-auto">
                     {protocolDetails.links.map((link, index) => (
                       <div key={index} className="flex items-center justify-between p-3 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors">
                         <div className="flex-1">
                           <div className="flex items-center gap-2">
                             <ExternalLink className="w-4 h-4 text-sky-600" />
                             <a 
                               href={link.url} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="font-medium text-sky-700 hover:text-sky-800 hover:underline"
                             >
                               {link.title}
                             </a>
                           </div>
                           {link.description && (
                             <div className="text-xs text-gray-600 mt-1 ml-6">{link.description}</div>
                           )}
                           {link.amount && (
                             <div className="text-xs text-green-600 font-medium mt-1 ml-6">
                               Valor aplicado: {formatCurrency(link.amount)}
                             </div>
                           )}
                         </div>
                         <div className="flex items-center gap-1 ml-2">
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => handleEditLink(link)}
                           >
                             ✏️
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => handleDeleteLink(link)}
                           >
                             🗑️
                           </Button>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-500 text-sm">Nenhum link adicionado</p>
                 )}
               </div>
             </div>
             <DialogFooter className="flex justify-between">
               <div className="flex gap-2">
                 <Button 
                   variant="outline" 
                   className="border-blue-200 text-blue-700 hover:bg-blue-50"
                   onClick={() => {
                     if (!selectedProtocol) return;
                     handleCloseModal()
                     handleEditProtocol(selectedProtocol)
                   }}
                 >
                   ✏️ Editar
                 </Button>
                 <Button 
                   variant="outline" 
                   className="border-red-200 text-red-700 hover:bg-red-50"
                   onClick={() => {
                      if (!selectedProtocol) return;
                      handleDeleteProtocol(selectedProtocol)
                   }}
                 >
                   🗑️ Deletar
                 </Button>
               </div>
               <Button variant="outline" onClick={handleCloseModal}>
                 Fechar
               </Button>
             </DialogFooter>
           </DialogContent>
         )}

         {/* Modal para adicionar link */}
         {activeModal === 'link' && selectedProtocol && (
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Adicionar Link - {selectedProtocol.name}</DialogTitle>
               <DialogDescription>
                 Adicione um link importante para acompanhar ativos aplicados.
               </DialogDescription>
             </DialogHeader>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="title" className="text-right">Título</Label>
                 <Input
                   id="title"
                   value={linkForm.title}
                   onChange={(e) => setLinkForm({...linkForm, title: e.target.value})}
                   className="col-span-3"
                   placeholder="Ex: Uniswap V3 Pool"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="url" className="text-right">URL</Label>
                 <Input
                   id="url"
                   value={linkForm.url}
                   onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                   className="col-span-3"
                   placeholder="https://..."
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="description" className="text-right">Descrição</Label>
                 <Textarea
                   id="description"
                   value={linkForm.description}
                   onChange={(e) => setLinkForm({...linkForm, description: e.target.value})}
                   className="col-span-3"
                   placeholder="Descrição opcional..."
                   rows={2}
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="amount" className="text-right">Valor (USD)</Label>
                 <Input
                   id="amount"
                   type="number"
                   step="0.01"
                   value={linkForm.amount}
                   onChange={(e) => setLinkForm({...linkForm, amount: e.target.value})}
                   className="col-span-3"
                   placeholder="Valor aplicado (opcional)"
                 />
               </div>
             </div>
             <DialogFooter>
               <Button type="submit" onClick={handleLinkSubmit}>
                 Adicionar Link
               </Button>
             </DialogFooter>
           </DialogContent>
         )}

         {/* Modal para editar link */}
         {activeModal === 'edit-link' && selectedProtocol && selectedLink && (
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Editar Link</DialogTitle>
               <DialogDescription>
                 Atualize as informações do link.
               </DialogDescription>
             </DialogHeader>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="title" className="text-right">Título</Label>
                 <Input
                   id="title"
                   value={linkForm.title}
                   onChange={(e) => setLinkForm({...linkForm, title: e.target.value})}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="url" className="text-right">URL</Label>
                 <Input
                   id="url"
                   value={linkForm.url}
                   onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="description" className="text-right">Descrição</Label>
                 <Textarea
                   id="description"
                   value={linkForm.description}
                   onChange={(e) => setLinkForm({...linkForm, description: e.target.value})}
                   className="col-span-3"
                   rows={2}
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="amount" className="text-right">Valor (USD)</Label>
                 <Input
                   id="amount"
                   type="number"
                   step="0.01"
                   value={linkForm.amount}
                   onChange={(e) => setLinkForm({...linkForm, amount: e.target.value})}
                   className="col-span-3"
                 />
               </div>
             </div>
             <DialogFooter>
               <Button type="submit" onClick={handleLinkUpdate}>
                 Atualizar Link
               </Button>
             </DialogFooter>
           </DialogContent>
         )}

         {/* Modal do Editor de Cartão */}
         {activeModal === 'card-editor' && selectedProtocol && (
           <DialogContent className="sm:max-w-[600px]">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                 <Palette className="w-5 h-5" />
                 Editar Cartão - {selectedProtocol.name}
               </DialogTitle>
               <DialogDescription>
                 Personalize a aparência do cartão do protocolo com cores e logo automáticos.
               </DialogDescription>
             </DialogHeader>
             <form onSubmit={handleCardEditorSubmit}>
               <div className="grid gap-6 py-4">
                 {/* Preview do Cartão */}
                 <div className="border rounded-lg p-4">
                   <h4 className="text-sm font-medium mb-3">Preview do Cartão</h4>
                   <div 
                     className="p-4 rounded-lg border-2 transition-all duration-200"
                     style={{ 
                       backgroundColor: cardEditor.backgroundColor ? `${cardEditor.backgroundColor}15` : '#f8f9fa',
                       borderColor: cardEditor.backgroundColor ? `${cardEditor.backgroundColor}40` : '#e9ecef'
                     }}
                   >
                     <div className="flex items-center gap-3 mb-2">
                       {extractedMetadata?.logo ? (
                         <Image 
                           src={extractedMetadata.logo} 
                           alt="Logo" 
                           width={32}
                           height={32}
                           className="w-8 h-8 rounded-full object-cover"
                         />
                       ) : selectedProtocol.logoUrl && (
                        <Image 
                          src={selectedProtocol.logoUrl} 
                          alt="Logo" 
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                       )}
                       <span 
                         className="font-semibold"
                         style={{ color: cardEditor.textColor || '#374151' }}
                       >
                         {selectedProtocol.name}
                       </span>
                     </div>
                     <p className="text-sm text-gray-600">
                       {extractedMetadata?.description || 'Descrição do protocolo aparecerá aqui'}
                     </p>
                   </div>
                 </div>

                 {/* URL do Website */}
                 <div className="grid gap-2">
                   <Label htmlFor="websiteUrl">URL do Website</Label>
                   <div className="flex gap-2">
                     <Input
                       id="websiteUrl"
                       value={cardEditor.websiteUrl}
                       onChange={(e) => setCardEditor(prev => ({ ...prev, websiteUrl: e.target.value }))}
                       placeholder="https://exemplo.com"
                       className="flex-1"
                     />
                     <Button 
                       type="button"
                       onClick={() => extractWebsiteMetadata(cardEditor.websiteUrl)}
                       disabled={!cardEditor.websiteUrl || cardEditor.isLoadingMetadata}
                       className="px-4"
                     >
                       {cardEditor.isLoadingMetadata ? (
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                       ) : (
                         <Link2 className="w-4 h-4" />
                       )}
                     </Button>
                   </div>
                   <p className="text-xs text-gray-500">
                     Cole a URL do protocolo para extrair automaticamente logo e cores. Note que a URL salva será atualizada.
                   </p>
                 </div>

                 {/* Cores */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Cor de Fundo */}
                   <div className="grid gap-2">
                     <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                     <div className="flex items-center gap-2">
                       <Input
                         id="backgroundColor"
                         type="color"
                         value={cardEditor.backgroundColor}
                         onChange={(e) => {
                           const newColor = e.target.value;
                           setCardEditor(prev => ({ 
                             ...prev, 
                             backgroundColor: newColor,
                             textColor: darkenColor(newColor, 50)
                           }))
                         }}
                         className="w-16 h-10 p-1 rounded cursor-pointer"
                       />
                       <Input
                         value={cardEditor.backgroundColor}
                         onChange={(e) => setCardEditor(prev => ({ ...prev, backgroundColor: e.target.value }))}
                         placeholder="#ffffff"
                         className="flex-1"
                       />
                     </div>
                   </div>

                   {/* Cor do Texto */}
                   <div className="grid gap-2">
                     <Label htmlFor="textColor">Cor do Nome</Label>
                     <div className="flex items-center gap-2">
                       <Input
                         id="textColor"
                         type="color"
                         value={cardEditor.textColor}
                         onChange={(e) => setCardEditor(prev => ({ ...prev, textColor: e.target.value }))}
                         className="w-16 h-10 p-1 rounded cursor-pointer"
                       />
                       <Input
                         value={cardEditor.textColor}
                         onChange={(e) => setCardEditor(prev => ({ ...prev, textColor: e.target.value }))}
                         placeholder="#000000"
                         className="flex-1"
                       />
                       <Button 
                         type="button"
                         variant="outline"
                         size="icon"
                         onClick={() => setCardEditor(prev => ({ 
                           ...prev, 
                           textColor: darkenColor(prev.backgroundColor, 50) 
                         }))}
                         className="px-3"
                         title="Auto-ajustar cor do texto"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.06L9.06 11.9z"/><path d="M7.22 10.02c-1.57-.78-3.47-.07-4.15 1.34-.68 1.42-.06 3.3.78 4.15l1.62 1.62 4.15-4.15-1.62-1.62z"/></svg>
                       </Button>
                     </div>
                   </div>
                 </div>

                 {/* Cores Sugeridas */}
                 {extractedMetadata?.colors && extractedMetadata.colors.length > 0 && (
                   <div className="grid gap-3 pt-4 border-t">
                     <Label>Cores Sugeridas</Label>
                     <div className="flex gap-2 flex-wrap">
                       {extractedMetadata.colors.slice(0, 8).map((color, index) => (
                         <button
                           key={index}
                           type="button"
                           className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 hover:border-blue-400 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                           style={{ backgroundColor: color }}
                           onClick={() => {
                             setCardEditor(prev => ({ 
                               ...prev, 
                               backgroundColor: color,
                               textColor: darkenColor(color, 50)
                             }))
                           }}
                           title={`Usar ${color} como cor de fundo`}
                         />
                       ))}
                     </div>
                   </div>
                 )}
               </div>
               <DialogFooter>
                 <Button type="submit">
                   Salvar Alterações
                 </Button>
               </DialogFooter>
             </form>
           </DialogContent>
         )}
      </Dialog>
    </>
  )
}
 