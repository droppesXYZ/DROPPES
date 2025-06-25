'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  Calendar, 
  Shield, 
  Bell,
  CheckCircle,
  Zap,
  Trophy,
  ArrowRight,
  BarChart3,
  Clock,
  Wallet,
  Gift,
  AlertTriangle,
  Crown
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px]" />
        <div className="relative">
          <div className="container mx-auto px-4 pt-20 pb-16">
            <div className="text-center max-w-4xl mx-auto">
              {/* Beta Badge */}
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <Zap className="w-3 h-3 mr-1" />
                Beta - Acesso Antecipado
              </Badge>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Organize os seus{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Airdrops
                </span>
                {' '}de uma vez por todas.
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Gerencie seus investimentos em protocolos cripto, organize tarefas diárias, 
                acompanhe TGEs e maximize seus airdrops com inteligência e estratégia.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg" asChild>
                  <Link href="/register">
                    <Gift className="w-5 h-5 mr-2" />
                    Começar Gratuitamente
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg border-2 bg-transparent text-gray-800 border-gray-700 hover:bg-gray-200/50 dark:text-gray-100 dark:border-gray-400 dark:hover:bg-gray-800/60" 
                  asChild
                >
                  <Link href="/pricing">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    Ver Planos Premium
                  </Link>
                </Button>
              </div>
              

            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              O mundo cripto é caótico. Seus airdrops não precisam ser.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quantas vezes você perdeu um airdrop porque esqueceu de fazer check-in? 
              Ou não sabia quanto tinha investido em cada protocolo?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-red-900 dark:text-red-100">Airdrops Perdidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 dark:text-red-200">
                  Esqueceu de fazer uma tarefa diária e perdeu meses de farming? 
                  Já aconteceu com todos nós.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-orange-900 dark:text-orange-100">Gestão de Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 dark:text-orange-200">
                  Sem controle dos investimentos, é impossível gerenciar riscos 
                  e diversificar adequadamente.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
              <CardHeader>
                <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle className="text-yellow-900 dark:text-yellow-100">Datas Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 dark:text-yellow-200">
                  TGE, claims, deadlines... Como acompanhar tudo sem um 
                  sistema organizado?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tudo que você precisa para dominar os airdrops
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Uma plataforma completa para gerenciar seus investimentos cripto e maximizar seus ganhos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-800">Controle de Investimentos</CardTitle>
                <CardDescription>
                  Monitore depósitos e retiradas em cada protocolo com precisão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Rastreamento automático de valores
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Histórico completo de transações
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cálculo de ROI em tempo real
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-800">Agenda Inteligente</CardTitle>
                <CardDescription>
                  Nunca mais perca deadlines, TGEs ou tarefas diárias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Lembretes automáticos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Calendário de TGEs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Check-ins diários organizados
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-gray-800">Gestão de Protocolos</CardTitle>
                <CardDescription>
                  Organize todos seus protocolos favoritos em um só lugar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Links diretos para protocolos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Status ativo/inativo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Informações detalhadas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-gray-800">Gestão de Risco</CardTitle>
                <CardDescription>
                  Visualize sua exposição e diversifique inteligentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Dashboard de exposição
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Alertas de concentração
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Análise de performance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-gray-800">Notificações Smart</CardTitle>
                <CardDescription>
                  Receba alertas personalizados no momento certo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Alertas de tarefas pendentes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Lembretes de TGE
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Notificações customizáveis
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-gray-800">Registro de Airdrops</CardTitle>
                <CardDescription>
                  Documente todos os airdrops recebidos e calcule ROI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Histórico de recebimentos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cálculo automático de valores
          </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Relatórios de performance
          </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Três passos simples para maximizar seus airdrops
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Adicione Protocolos</h3>
              <p className="text-gray-600">
                Cadastre os protocolos que você está farmando com informações de investimento e links diretos
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Configure Tarefas</h3>
              <p className="text-gray-600">
                Crie lembretes para check-ins diários, claims e outras atividades necessárias
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Receba & Registre</h3>
              <p className="text-gray-600">
                Documente airdrops recebidos e acompanhe o ROI de seus investimentos
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para maximizar seus airdrops?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Junte-se a centenas de usuários que já organizaram seus investimentos 
              e nunca mais perderam um airdrop
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg" asChild>
                <Link href="/register">
                  <Zap className="w-5 h-5 mr-2" />
                  Começar Agora - Grátis
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg" asChild>
                <Link href="/pricing">
                  Ver Planos Premium
                </Link>
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              ✅ Sem cartão de crédito • ✅ Configuração em 2 minutos • ✅ Suporte 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">💧</span>
                </div>
                <span className="font-bold text-xl">Droppes</span>
              </div>
              <p className="text-gray-400">
                A plataforma definitiva para gerenciar seus airdrops e protocolos DeFi.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Planos</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/register" className="hover:text-white">Começar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentação</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-white">Termos</Link></li>
                <li><Link href="#" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Droppes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
