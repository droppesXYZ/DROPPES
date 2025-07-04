'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedBackground } from '@/components/ui/animated-background'
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
  Crown,
  Star,
  Users,
  TrendingUp
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Background Animado */}
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen hero-background">
        <div className="relative z-10">
          <div className="container mx-auto px-4 pt-20 pb-16">
            <div className="text-center max-w-5xl mx-auto">
              {/* Beta Badge Melhorado */}
              <Badge className="mb-8 feature-pill animate-pulse-glow">
                <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                Beta - Acesso Antecipado
              </Badge>
              
              {/* Main Headline com Novo Estilo */}
              <h1 className="hero-title mb-8">
                Organize os seus{' '}
                <span className="text-gradient-animate">
                  Airdrops
                </span>
                {' '}de uma vez por todas.
              </h1>
              
              {/* Feature Pills */}
              <div className="feature-pills mb-8">
                <div className="pill security">
                  <Shield className="w-4 h-4 mr-1" />
                  Máxima Segurança
                </div>
                <div className="pill community">
                  <Users className="w-4 h-4 mr-1" />
                  Comunidade Ativa
                </div>
                <div className="pill roi">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  ROI Garantido
                </div>
              </div>
              
              {/* Subtitle Melhorado */}
              <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Gerencie seus investimentos em protocolos cripto, organize tarefas diárias, 
                acompanhe TGEs e maximize seus airdrops com inteligência e estratégia.
              </p>
              
              {/* CTA Buttons Melhorados */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button size="lg" className="cta-button px-10 py-6 text-lg font-semibold" asChild>
                  <Link href="/register">
                    <Gift className="w-6 h-6 mr-3" />
                    Começar Gratuitamente
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="px-10 py-6 text-lg font-semibold glass-effect border-cyan-400/30 text-white hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300" 
                  asChild
                >
                  <Link href="/pricing">
                    <Crown className="w-6 h-6 mr-3 text-yellow-400" />
                    Ver Planos Premium
                  </Link>
                </Button>
              </div>

              {/* Indicadores de Confiança */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Sem cartão de crédito
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Configuração em 2 minutos
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Suporte 24/7
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  100+ usuários ativos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900/95 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 hero-title">
              O mundo cripto é caótico. Seus{' '}
              <span className="text-gradient-animate">airdrops</span>
              {' '}não precisam ser.
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Quantas vezes você perdeu um airdrop porque esqueceu de fazer check-in? 
              Ou não sabia quanto tinha investido em cada protocolo?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="feature-card group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-all duration-300">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Airdrops Perdidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-center leading-relaxed">
                  Esqueceu de fazer uma tarefa diária e perdeu meses de farming? 
                  Já aconteceu com todos nós.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-orange-400" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Gestão de Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-center leading-relaxed">
                  Sem controle dos investimentos, é impossível gerenciar riscos 
                  e diversificar adequadamente.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Datas Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-center leading-relaxed">
                  TGE, claims, deadlines... Como acompanhar tudo sem um 
                  sistema organizado?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 hero-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 hero-title">
              Tudo que você precisa para{' '}
              <span className="text-gradient-animate">dominar os airdrops</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Uma plataforma completa para gerenciar seus investimentos cripto e maximizar seus ganhos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all duration-300">
                  <Wallet className="w-7 h-7 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Controle de Investimentos</CardTitle>
                <CardDescription className="text-slate-400">
                  Monitore depósitos e retiradas em cada protocolo com precisão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Rastreamento automático de valores
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Histórico completo de transações
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Cálculo de ROI em tempo real
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all duration-300">
                  <Calendar className="w-7 h-7 text-green-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Agenda Inteligente</CardTitle>
                <CardDescription className="text-slate-400">
                  Nunca mais perca deadlines, TGEs ou tarefas diárias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Lembretes automáticos
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Calendário de TGEs
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Check-ins diários organizados
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all duration-300">
                  <Target className="w-7 h-7 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Gestão de Protocolos</CardTitle>
                <CardDescription className="text-slate-400">
                  Organize todos seus protocolos favoritos em um só lugar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Links diretos para protocolos
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Status ativo/inativo
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Informações detalhadas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-all duration-300">
                  <Shield className="w-7 h-7 text-orange-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Gestão de Risco</CardTitle>
                <CardDescription className="text-slate-400">
                  Visualize sua exposição e diversifique inteligentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Dashboard de exposição
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Alertas de concentração
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Análise de performance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-all duration-300">
                  <Bell className="w-7 h-7 text-red-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Notificações Smart</CardTitle>
                <CardDescription className="text-slate-400">
                  Receba alertas personalizados no momento certo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Alertas de tarefas pendentes
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Lembretes de TGE
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Notificações customizáveis
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Trophy className="w-7 h-7 text-yellow-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Registro de Airdrops</CardTitle>
                <CardDescription className="text-slate-400">
                  Documente todos os airdrops recebidos e calcule ROI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Histórico de recebimentos
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Cálculo automático de valores
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Relatórios de performance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-900/95 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 hero-title">
              <span className="text-gradient-animate">Como funciona</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Três passos simples para maximizar seus airdrops
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/25">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Adicione Protocolos</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Cadastre os protocolos que você está farmando com informações de investimento e links diretos
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-green-500/25">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Configure Tarefas</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Crie lembretes para check-ins diários, claims e outras atividades necessárias
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Receba & Registre</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Documente airdrops recebidos e acompanhe o ROI de seus investimentos
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-24 hero-background relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 hero-title">
              Pronto para{' '}
              <span className="text-gradient-animate">maximizar seus airdrops?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Junte-se a centenas de usuários que já organizaram seus investimentos 
              e nunca mais perderam um airdrop
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button size="lg" className="cta-button px-10 py-6 text-lg font-semibold" asChild>
                <Link href="/register">
                  <Zap className="w-6 h-6 mr-3" />
                  Começar Agora - Grátis
                </Link>
              </Button>
              <Button size="lg" className="px-10 py-6 text-lg font-semibold glass-effect border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300" asChild>
                <Link href="/pricing">
                  <Crown className="w-6 h-6 mr-3 text-yellow-400" />
                  Ver Planos Premium
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Configuração em 2 minutos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Suporte 24/7
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Garantia de 30 dias
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold text-lg">💧</span>
                </div>
                <span className="font-bold text-2xl text-gradient-animate">Droppes</span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                A plataforma definitiva para gerenciar seus airdrops e protocolos DeFi.
                Maximize seus ganhos com inteligência e estratégia.
              </p>
              <div className="flex gap-4">
                <div className="pill">
                  <Shield className="w-4 h-4 mr-1" />
                  Seguro
                </div>
                <div className="pill community">
                  <Users className="w-4 h-4 mr-1" />
                  Confiável
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl text-white">Produto</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Planos</Link></li>
                <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/register" className="hover:text-cyan-400 transition-colors">Começar</Link></li>
                <li><Link href="/calendar" className="hover:text-cyan-400 transition-colors">Calendário</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl text-white">Suporte</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Documentação</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Comunidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400">
            <p>&copy; 2024 Droppes. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-cyan-400 transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Termos</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
