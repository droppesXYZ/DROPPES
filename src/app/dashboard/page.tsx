'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore, useProtocolStore, useUIStore } from '@/lib/store'
import { DashboardStats, Protocol, Investment, Task, Airdrop, ProtocolLink as LinkItem } from '@/lib/types'
import { FREE_PROTOCOL_LIMIT, SUPPORTED_NETWORKS } from '@/lib/constants'
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
  Trash2,
  X as XIcon,
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Se necessário, implemente a função localmente:
function isUserPremium(user: { isPremium: boolean; premiumUntil?: Date | null }) {
  if (!user.isPremium) return false
  if (!user.premiumUntil) return false
  return new Date() < new Date(user.premiumUntil)
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const { protocols, setProtocols } = useProtocolStore()
  const { isLoading, setLoading, error, setError, clearError } = useUIStore()
  
  const [stats, setStats] = useState<DashboardStats>({
    totalProtocols: 0,
    totalInvested: 0,
    pendingTasks: 0,
    airdropsTotal: 0
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
          airdropsTotal: 0
        })
      } else {
        // Se não conseguir carregar dados, usar valores padrão
        setProtocols([])
        setStats({
          totalProtocols: 0,
          totalInvested: 0,
          pendingTasks: 0,
          airdropsTotal: 0
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
        airdropsTotal: 0
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
    if (!hex || hex.length < 4) return '#000000'
    
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
    setActiveModal('card-editor')
    setIsModalOpen(true)
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
        logoUrl: selectedProtocol.logoUrl,
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Carregando...</h1>
          <p className="text-slate-300">Verificando autenticação</p>
        </div>
      </div>
    )
  }

  const isPremium = isUserPremium(user)

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 py-8 sm:px-4 lg:px-6 xl:px-8">
        {/* Onboarding Card */}
        {protocols.length === 0 && !isLoading && (
          <Card className="mb-8 bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-400" />
                Bem-vindo de volta, soldado!
              </CardTitle>
              <CardDescription className="text-slate-300">
                Pronto para dominar os airdrops? Comece adicionando seus primeiros protocolos e 
                organize sua estratégia de farming.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Plus className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-white">Adicione Protocolos</h3>
                    <p className="text-sm text-slate-300">Comece cadastrando seus projetos favoritos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-white">Registre Investimentos</h3>
                    <p className="text-sm text-slate-300">Acompanhe quanto você investiu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Calendar className="h-8 w-8 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Organize Tarefas</h3>
                    <p className="text-sm text-slate-300">Nunca mais perca um check-in</p>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300" 
                onClick={handleOpenModal}
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Meu Primeiro Protocolo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Header com badges */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-300">Bem-vindo de volta, soldado!</p>
          </div>
          
          {!isPremium && protocols.length > 0 && (
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-yellow-500/50 bg-yellow-500/10 text-yellow-300">
                <Crown className="w-3 h-3 mr-1" />
                {protocols.length}/{FREE_PROTOCOL_LIMIT} protocolos
              </Badge>
              <Button asChild variant="outline" className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20 transition-colors">
                <Link href="/pricing">
                  Fazer Upgrade
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg hover:bg-slate-900/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total de Protocolos</CardTitle>
              <Target className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProtocols}</div>
              <p className="text-xs text-slate-400">
                {isPremium ? 'Ilimitado' : `${Math.max(0, FREE_PROTOCOL_LIMIT - protocols.length)} restantes`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg hover:bg-slate-900/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Investido</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalInvested)}</div>
              <p className="text-xs text-slate-400">
                Em todos os protocolos
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg hover:bg-slate-900/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Tarefas Pendentes</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingTasks}</div>
              <p className="text-xs text-slate-400">
                Requerem atenção
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-200/10 backdrop-blur-lg hover:bg-slate-900/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Retornos em Airdrops</CardTitle>
              <Gift className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.airdropsTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</div>
              <p className="text-xs text-slate-400">
                Total conquistado em airdrops
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Protocolos */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 pb-8 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">
            Meus Protocolos
          </h2>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl" 
            onClick={handleOpenModal}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Protocolo
          </Button>
        </div>

        {/* Filtros */}
        {protocols.length > 0 && (
          <Card className="mb-6 p-4 bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Campo de busca */}
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Buscar por nome do protocolo..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-400"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Filtro por status */}
              <div className="min-w-[150px]">
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800/50 border-slate-600/50 text-white"
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
                  className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800/50 border-slate-600/50 text-white"
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
              <div className="mt-3 pt-3 border-t border-slate-600/50">
                <p className="text-sm text-slate-400">
                  <Filter className="inline w-4 h-4 mr-1" />
                  Mostrando {filteredProtocols.length} de {protocols.length} protocolos
                  {filters.search && (
                    <span className="ml-2">
                      • Busca: &quot;<span className="font-medium text-white">{filters.search}</span>&quot;
                    </span>
                  )}
                  {filters.status !== 'all' && (
                    <span className="ml-2">
                      • Status: <span className="font-medium text-white">
                        {filters.status === 'active' ? 'Ativos' : 'Finalizados'}
                      </span>
                    </span>
                  )}
                  {filters.network !== 'all' && (
                    <span className="ml-2">
                      • Rede: <span className="font-medium text-white">{filters.network}</span>
                    </span>
                  )}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Grid de Protocolos */}
        {protocols.length > 0 && filteredProtocols.length === 0 ? (
          <Card className="p-8 text-center bg-slate-900/50 border-slate-200/10 backdrop-blur-lg">
            <div className="flex flex-col items-center space-y-4">
              <Search className="w-12 h-12 text-slate-400" />
              <h3 className="text-lg font-semibold text-white">Nenhum protocolo encontrado</h3>
              <p className="text-slate-400 max-w-md">
                Não encontramos protocolos que correspondam aos filtros aplicados. 
                Tente ajustar os critérios de busca.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="mt-2 border-slate-600 text-slate-300 hover:bg-slate-800/50"
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
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-slate-900/50 border-slate-200/10 backdrop-blur-lg hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-purple-500/10"
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
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-400"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <span className="text-white font-semibold">
                        {protocol.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        {protocol.network}
                      </Badge>
                      <Badge 
                        variant={protocol.isActive ? "default" : "secondary"}
                        className={protocol.isActive 
                          ? "bg-green-500/20 text-green-300 border-green-500/30" 
                          : "bg-slate-500/20 text-slate-400 border-slate-500/30"
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
                            className="h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-white"
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
                  <CardDescription className="text-base font-medium text-green-400">
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
                      className={`${protocol.twitterHandle ? 'flex-1' : 'w-full'} bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50 font-medium`}
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
                        className="flex-1 bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/50 font-medium"
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
                    className="w-full bg-slate-800/50 border-slate-700/50 text-slate-100 hover:bg-slate-700/50 hover:border-slate-600 font-medium px-3 py-2 rounded-md focus:border-blue-500 focus:ring-blue-500/50"
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

      {/* Seção de boas-vindas para novos usuários (agora condicional) */}
      {protocols.length === 0 && !isLoading && (
        <Card className="p-8 dark:bg-slate-800/20 dark:border-slate-100/10 dark:backdrop-blur-sm">
          {/* Content */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-inset ring-blue-500/30">
                <Gift className="w-7 h-7 text-blue-300" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-100">Bem-vindo ao Droppes!</h3>
                <p className="text-slate-400">Sua plataforma de gerenciamento de airdrops.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Funcionalidades */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Funcionalidades principais:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-100/10">
                    <Target className="w-5 h-5 text-blue-300 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Gerencie até {FREE_PROTOCOL_LIMIT} protocolos gratuitamente</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-100/10">
                    <TrendingUp className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Acompanhe investimentos e ROI</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-100/10">
                    <Calendar className="w-5 h-5 text-purple-300 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Organize tarefas diárias</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-100/10">
                    <Twitter className="w-5 h-5 text-sky-300 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Feed do Twitter integrado</span>
                  </div>
                </div>
              </div>

              {/* Primeiros Passos */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  Primeiros passos:
                </h4>
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                    onClick={handleOpenModal}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar primeiro protocolo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full border-slate-100/20 text-slate-200 bg-slate-100/10 hover:bg-slate-100/20 hover:border-slate-100/30 backdrop-blur-sm font-semibold transition-all duration-200 shadow-lg" 
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
            <div className="mt-8 pt-6 border-t border-slate-100/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Progresso da configuração</span>
                <span className="text-slate-300 font-medium">{protocols.length > 0 ? '1/3' : '0/3'} concluído</span>
              </div>
              <div className="mt-2 w-full bg-slate-100/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: protocols.length > 0 ? '33%' : '0%' }}
                />
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className={protocols.length > 0 ? 'text-green-300' : ''}>
                  {protocols.length > 0 ? '✓' : '○'} Adicionar protocolo
                </span>
                <span>○ Fazer primeiro investimento</span>
                <span>○ Criar primeira task</span>
              </div>
            </div>
          </div>
        </Card>
      )}

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
            <p className="text-slate-300">Carregando...</p>
          </div>
        </div>
      )}

      {/* Modais */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        {activeModal === 'protocol' && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Adicionar Protocolo</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do protocolo que deseja adicionar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-slate-200">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="network" className="text-right text-slate-200">Rede</Label>
                <select
                  id="network"
                  value={formData.network}
                  onChange={(e) => handleInputChange('network', e.target.value)}
                  className="col-span-3 flex h-9 w-full rounded-md border border-slate-700/50 bg-slate-800/50 text-slate-100 px-3 py-2 shadow-xs focus:border-blue-500 focus:ring-blue-500/50 hover:bg-slate-800/70"
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
                  <Label htmlFor="customNetwork" className="text-right text-slate-200">Nome da Rede</Label>
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
                <Label htmlFor="officialUrl" className="text-right text-slate-200">URL Oficial</Label>
                <Input
                  id="officialUrl"
                  value={formData.officialUrl}
                  onChange={(e) => handleInputChange('officialUrl', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitterHandle" className="text-right text-slate-200">Twitter Handle</Label>
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
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Editar Protocolo</DialogTitle>
              <DialogDescription>
                Atualize as informações do protocolo {selectedProtocol.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-slate-200">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="network" className="text-right text-slate-200">Rede</Label>
                <select
                  id="network"
                  value={formData.network}
                  onChange={(e) => handleInputChange('network', e.target.value)}
                  className="col-span-3 flex h-9 w-full rounded-md border border-slate-700/50 bg-slate-800/50 text-slate-100 px-3 py-2 shadow-xs focus:border-blue-500 focus:ring-blue-500/50 hover:bg-slate-800/70"
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
                  <Label htmlFor="customNetwork" className="text-right text-slate-200">Nome da Rede</Label>
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
                <Label htmlFor="officialUrl" className="text-right text-slate-200">URL Oficial</Label>
                <Input
                  id="officialUrl"
                  value={formData.officialUrl}
                  onChange={(e) => handleInputChange('officialUrl', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitterHandle" className="text-right text-slate-200">Twitter Handle</Label>
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
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Adicionar Investimento - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Registre um depósito ou retirada no protocolo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-slate-200">Tipo</Label>
                <select
                  id="type"
                  value={investmentForm.type}
                  onChange={(e) => setInvestmentForm({...investmentForm, type: e.target.value as 'deposit' | 'withdrawal'})}
                  className="col-span-3 flex h-9 w-full rounded-md border border-slate-700/50 bg-slate-800/50 text-slate-100 px-3 py-2 shadow-xs focus:border-blue-500 focus:ring-blue-500/50 hover:bg-slate-800/70"
                >
                  <option value="deposit">Depósito</option>
                  <option value="withdrawal">Retirada</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right text-slate-200">Valor (USD)</Label>
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
                <Label htmlFor="date" className="text-right text-slate-200">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={investmentForm.date}
                  onChange={(e) => setInvestmentForm({...investmentForm, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-slate-200">Tokens</Label>
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
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Adicionar Task - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Crie uma missão diária ou semanal para este protocolo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-slate-200">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Check-in diário"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-slate-200">Frequência</Label>
                <select
                  id="type"
                  value={taskForm.type}
                  onChange={(e) => setTaskForm({...taskForm, type: e.target.value as 'daily' | 'weekly'})}
                  className="col-span-3 flex h-9 w-full rounded-md border border-slate-700/50 bg-slate-800/50 text-slate-100 px-3 py-2 shadow-xs focus:border-blue-500 focus:ring-blue-500/50 hover:bg-slate-800/70"
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right text-slate-200">Data Limite</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-slate-200">Descrição</Label>
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
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Registrar Airdrop - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Registre o recebimento de tokens do airdrop.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticker" className="text-right text-slate-200">Ticker</Label>
                <Input
                  id="ticker"
                  placeholder="Ex: ARB, OP, BLUR..."
                  value={airdropForm.ticker}
                  onChange={(e) => handleAirdropInputChange('ticker', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right text-slate-200">Quantidade</Label>
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
                <Label htmlFor="tokenPrice" className="text-right text-slate-200">Preço (USD)</Label>
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
                <Label htmlFor="date" className="text-right text-slate-200">Data TGE</Label>
                <Input
                  id="date"
                  type="date"
                  value={airdropForm.date}
                  onChange={(e) => handleAirdropInputChange('date', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-slate-200">Valor Total</Label>
                <div className="col-span-3 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-md">
                  <span className="text-green-300 font-semibold">
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
             <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
               <XIcon className="h-4 w-4" />
               <span className="sr-only">Close</span>
             </DialogClose>
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
                       ? 'bg-green-900/20 border-green-500/30' 
                       : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                   }`}>
                     {/* Checkbox */}
                     <button
                       onClick={() => handleToggleTask(task.id, task.isCompleted)}
                       className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                         task.isCompleted
                           ? 'bg-green-500 border-green-500 text-white'
                           : 'border-slate-600 hover:border-green-400'
                       }`}
                     >
                       {task.isCompleted && (
                         <CheckCircle className="w-4 h-4" />
                       )}
                     </button>

                     {/* Conteúdo da Task */}
                     <div className="flex-1">
                       <div className={`font-medium ${task.isCompleted ? 'line-through text-slate-400' : ''}`}>
                         {task.title}
                       </div>
                       {task.description && (
                         <div className="text-sm text-slate-400 mt-1">{task.description}</div>
                       )}
                       <div className="text-xs text-slate-400 mt-1">
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
                   <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                   <p className="text-slate-400">Nenhuma task criada ainda</p>
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
           <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-slate-900/95 border-slate-200/10 backdrop-blur-lg">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader className="space-y-3 pb-6 border-b border-slate-200/10">
              <div className="flex items-center gap-3">
                {selectedProtocol.logoUrl && (
                  <Image 
                    src={selectedProtocol.logoUrl} 
                    alt={selectedProtocol.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg bg-slate-800/50 p-1"
                  />
                )}
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">{selectedProtocol.name}</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Resumo completo dos investimentos, tasks e airdrops
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-8 py-6">
              {/* Resumo Geral - Cards melhorados */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl backdrop-blur-sm hover:border-green-400/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-sm font-medium text-green-300">Total Investido</div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(selectedProtocol.totalInvested || 0)}
                  </div>
                  <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="group relative p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-sm font-medium text-blue-300">Tasks Pendentes</div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {selectedProtocol.pendingTasks || 0}
                  </div>
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Investimentos - Seção melhorada */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-200/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    Investimentos ({protocolDetails.investments.length})
                  </h4>
                  {protocolDetails.investments.length > 0 && (
                    <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                      Total: {formatCurrency(protocolDetails.investments.reduce((sum, inv) => 
                        sum + (inv.type === 'DEPOSIT' ? inv.amount : -inv.amount), 0))}
                    </Badge>
                  )}
                </div>
                {protocolDetails.investments.length > 0 ? (
                  <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                    {protocolDetails.investments.map((investment, index) => (
                      <div key={index} className="group flex justify-between items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            investment.type === 'DEPOSIT' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {investment.type === 'DEPOSIT' ? '↗️' : '↙️'}
                          </div>
                          <div>
                            <span className={`font-semibold text-base ${
                              investment.type === 'DEPOSIT' ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {investment.type === 'DEPOSIT' ? 'Depósito' : 'Retirada'}
                            </span>
                            <div className="text-sm text-slate-400">{investment.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            investment.type === 'DEPOSIT' ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {investment.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(investment.amount)}
                          </div>
                          <div className="text-sm text-slate-400">
                            {new Date(investment.date).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-base">Nenhum investimento registrado</p>
                    <p className="text-slate-500 text-sm mt-1">Adicione seus primeiros investimentos para começar</p>
                  </div>
                )}
              </div>

              {/* Tasks - Seção melhorada */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-200/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="w-4 h-4 text-orange-400" />
                    </div>
                    Tasks ({protocolDetails.tasks.length})
                  </h4>
                  {protocolDetails.tasks.length > 0 && (
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        ✅ {protocolDetails.tasks.filter(t => t.isCompleted).length} Concluídas
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        ⏳ {protocolDetails.tasks.filter(t => !t.isCompleted).length} Pendentes
                      </Badge>
                    </div>
                  )}
                </div>
                {protocolDetails.tasks.length > 0 ? (
                  <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                    {protocolDetails.tasks.map((task, index) => (
                      <div key={index} className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                        task.isCompleted 
                          ? 'bg-green-900/20 border-green-500/30 hover:border-green-400/50' 
                          : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/50'
                      }`}>
                        {/* Checkbox melhorado */}
                        <button
                          onClick={() => handleToggleTask(task.id, task.isCompleted)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                            task.isCompleted
                              ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/25'
                              : 'border-slate-500 hover:border-green-400 hover:bg-green-500/10'
                          }`}
                        >
                          {task.isCompleted && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>

                        {/* Conteúdo da Task */}
                        <div className="flex-1">
                          <div className={`font-semibold text-base transition-all ${
                            task.isCompleted ? 'line-through text-slate-400' : 'text-white'
                          }`}>
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-sm text-slate-400 mt-1">{task.description}</div>
                          )}
                        </div>

                        {/* Status e Data */}
                        <div className="text-right">
                          <Badge 
                            variant={task.isCompleted ? "default" : "secondary"} 
                            className={`mb-2 ${
                              task.isCompleted 
                                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                                : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                            }`}
                          >
                            {task.isCompleted ? '✅ Concluída' : '⏳ Pendente'}
                          </Badge>
                          <div className="text-sm text-slate-400">
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
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-base">Nenhuma task criada</p>
                    <p className="text-slate-500 text-sm mt-1">Crie suas primeiras tarefas para organizar seu trabalho</p>
                  </div>
                )}
              </div>

              {/* Airdrops - Seção melhorada */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-200/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Gift className="w-4 h-4 text-purple-400" />
                    </div>
                    Airdrops ({protocolDetails.airdrops.length})
                  </h4>
                  {protocolDetails.airdrops.length > 0 && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      💰 Total: {formatCurrency(protocolDetails.airdrops.reduce((sum, airdrop) => sum + airdrop.totalValue, 0))}
                    </Badge>
                  )}
                </div>
                {protocolDetails.airdrops.length > 0 ? (
                  <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                    {protocolDetails.airdrops.map((airdrop, index) => (
                      <div key={index} className="group flex justify-between items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Gift className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <span className="font-bold text-lg text-purple-300">{airdrop.ticker}</span>
                            <div className="text-sm text-slate-400">
                              {airdrop.quantity.toLocaleString()} tokens
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-purple-300">
                            {formatCurrency(airdrop.totalValue)}
                          </div>
                          <div className="text-sm text-slate-400">
                            {new Date(airdrop.date).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-base">Nenhum airdrop registrado</p>
                    <p className="text-slate-500 text-sm mt-1">Registre seus airdrops para acompanhar os ganhos</p>
                  </div>
                )}
              </div>

              {/* Links - Seção melhorada */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-200/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <div className="w-6 h-6 bg-sky-500/20 rounded-lg flex items-center justify-center mr-3">
                      <LinkIcon className="w-4 h-4 text-sky-400" />
                    </div>
                    Links Importantes ({protocolDetails.links.length})
                  </h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/50"
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
                  <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                    {protocolDetails.links.map((link, index) => (
                      <div key={index} className="group flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200">
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center">
                            <ExternalLink className="w-5 h-5 text-sky-400" />
                          </div>
                          <div className="flex-1">
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-semibold text-base text-sky-300 hover:text-sky-200 hover:underline transition-colors"
                            >
                              {link.title}
                            </a>
                            {link.description && (
                              <div className="text-sm text-slate-400 mt-1">{link.description}</div>
                            )}
                            {link.amount && (
                              <div className="text-sm text-green-300 font-medium mt-1 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Valor aplicado: {formatCurrency(link.amount)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                            onClick={() => handleEditLink(link)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteLink(link)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LinkIcon className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-base">Nenhum link adicionado</p>
                    <p className="text-slate-500 text-sm mt-1">Adicione links importantes para acompanhar facilmente</p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center pt-6 border-t border-slate-200/10">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50"
                  onClick={() => {
                    if (!selectedProtocol) return;
                    handleCloseModal()
                    handleEditProtocol(selectedProtocol)
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Protocolo
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-400/50"
                  onClick={() => {
                     if (!selectedProtocol) return;
                     handleDeleteProtocol(selectedProtocol)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/50"
                onClick={handleCloseModal}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {/* Modal para adicionar link */}
        {activeModal === 'link' && selectedProtocol && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Adicionar Link - {selectedProtocol.name}</DialogTitle>
              <DialogDescription>
                Adicione um link importante para acompanhar ativos aplicados.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-slate-200">Título</Label>
                <Input
                  id="title"
                  value={linkForm.title}
                  onChange={(e) => setLinkForm({...linkForm, title: e.target.value})}
                  className="col-span-3"
                  placeholder="Ex: Uniswap V3 Pool"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right text-slate-200">URL</Label>
                <Input
                  id="url"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                  className="col-span-3"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-slate-200">Descrição</Label>
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
                <Label htmlFor="amount" className="text-right text-slate-200">Valor (USD)</Label>
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
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Editar Link</DialogTitle>
              <DialogDescription>
                Atualize as informações do link.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-slate-200">Título</Label>
                <Input
                  id="title"
                  value={linkForm.title}
                  onChange={(e) => setLinkForm({...linkForm, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right text-slate-200">URL</Label>
                <Input
                  id="url"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-slate-200">Descrição</Label>
                <Textarea
                  id="description"
                  value={linkForm.description}
                  onChange={(e) => setLinkForm({...linkForm, description: e.target.value})}
                  className="col-span-3"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right text-slate-200">Valor (USD)</Label>
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
          <DialogContent className="sm:max-w-md">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Editar Cartão - {selectedProtocol.name}
              </DialogTitle>
              <DialogDescription>
                Personalize a aparência do cartão do protocolo escolhendo as cores.
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
                      <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
                        {selectedProtocol.name[0]}
                      </span>
                      <span 
                        className="font-bold text-xl"
                        style={{ color: cardEditor.textColor }}
                      >
                        {selectedProtocol.name}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Escolha de cor do cartão */}
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-200">Cor de fundo do cartão</Label>
                  <Input
                    type="color"
                    value={cardEditor.backgroundColor}
                    onChange={e => setCardEditor(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-16 h-10 p-0 border-none bg-transparent cursor-pointer"
                  />
                </div>
                {/* Escolha de cor da fonte */}
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-200">Cor do texto do título</Label>
                  <Input
                    type="color"
                    value={cardEditor.textColor}
                    onChange={e => setCardEditor(prev => ({ ...prev, textColor: e.target.value }))}
                    className="w-16 h-10 p-0 border-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
 
