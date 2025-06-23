# 💧 Droppes - DeFi Protocol Manager

Uma aplicação web completa para gerenciar protocolos DeFi, construída com Next.js, TypeScript, e shadcn/ui.

## 🚀 Funcionalidades

### ✅ Funcionalidades Implementadas

#### 🔐 Autenticação
- ✅ Sistema completo de login/cadastro
- ✅ Autenticação JWT com cookies seguros
- ✅ Hash de senhas com bcryptjs
- ✅ Gerenciamento de sessão com Zustand
- ✅ Primeiro usuário se torna admin automaticamente

#### 📊 Dashboard
- ✅ Dashboard principal com estatísticas
- ✅ Cards responsivos para protocolos
- ✅ Visão geral de investimentos e tarefas
- ✅ Interface limpa e moderna

#### 🎯 Gestão de Protocolos
- ✅ Adicionar protocolos com informações completas
- ✅ Limite de 3 protocolos para usuários gratuitos
- ✅ Protocolos ilimitados para Premium
- ✅ Suporte para múltiplas redes blockchain
- ✅ Cores personalizáveis para cada protocolo
- ✅ Links diretos para sites e Twitter

#### 💰 Sistema de Pagamentos
- ✅ Página de preços com 3 planos (Mensal, Trimestral, Semestral)
- ✅ Pagamentos em USDC/USDT na rede Solana
- ✅ Sistema de verificação de transações
- ✅ Página administrativa para aprovar pagamentos

#### 🎨 Interface & UX
- ✅ Design responsivo e moderno
- ✅ Componentes shadcn/ui
- ✅ Tema claro/escuro automático
- ✅ Header com navegação intuitiva
- ✅ Landing page completa

#### 🛠 Infraestrutura
- ✅ Next.js 15 com App Router
- ✅ TypeScript para tipagem segura
- ✅ Prisma + SQLite (preparado para migração)
- ✅ Tailwind CSS para estilização
- ✅ pnpm como gerenciador de pacotes

### 🔄 Funcionalidades em Desenvolvimento

#### 📋 Tarefas & Missões
- 🚧 Sistema de tarefas diárias
- 🚧 Toggle para marcar como concluído
- 🚧 Filtros por status (pendente/concluído)
- 🚧 Associação com protocolos

#### 📈 Histórico de Investimentos
- 🚧 Registro de depósitos e retiradas
- 🚧 Cálculo automático de total investido
- 🚧 Gráficos de performance

#### 🐦 Feed do Twitter
- 🚧 Integração com API do Twitter
- 🚧 Cache de tweets por protocolo
- 🚧 Exibição dos últimos 3 tweets
- 🚧 Botão de atualização manual

#### 👑 Painel Administrativo
- 🚧 Gestão de pagamentos Premium
- 🚧 Aprovação/rejeição de solicitações
- 🚧 Dashboard administrativo
- 🚧 Gestão de usuários

## 🛠 Stack Tecnológica

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface
- **Zustand** - Gerenciamento de estado
- **Lucide React** - Ícones

### Backend
- **Next.js API Routes** - Backend integrado
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT

### Desenvolvimento
- **pnpm** - Gerenciador de pacotes
- **date-fns** - Manipulação de datas
- **clsx** - Utilitário para classes CSS

## 📁 Estrutura do Projeto

```
droppes-app/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── api/               # Routes da API
│   │   │   ├── auth/          # Autenticação
│   │   │   ├── dashboard/     # Dashboard data
│   │   │   ├── protocols/     # Gestão de protocolos
│   │   │   └── payments/      # Sistema de pagamentos
│   │   ├── dashboard/         # Página principal
│   │   ├── login/            # Página de login
│   │   ├── register/         # Página de cadastro
│   │   ├── pricing/          # Página de preços
│   │   └── page.tsx          # Landing page
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── layout/          # Componentes de layout
│   │   └── dashboard/       # Componentes específicos
│   └── lib/                 # Utilitários e configurações
│       ├── prisma.ts        # Cliente Prisma
│       ├── auth.ts          # Utilitários de autenticação
│       ├── store.ts         # Estado global (Zustand)
│       ├── types.ts         # Tipos TypeScript
│       └── constants.ts     # Constantes da aplicação
├── prisma/
│   └── schema.prisma        # Schema do banco de dados
├── public/                  # Arquivos estáticos
└── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd droppes-app
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas configurações:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
JWT_SECRET="your-jwt-secret-here"
PAYMENT_WALLET_ADDRESS="your-solana-wallet-address"
ADMIN_EMAIL="admin@droppes.com"
```

4. **Configure o banco de dados**
```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

5. **Execute o servidor de desenvolvimento**
```bash
pnpm dev
```

Acesse `http://localhost:3000`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build           # Build para produção
pnpm start           # Inicia servidor de produção

# Banco de dados
pnpm dlx prisma generate    # Gera cliente Prisma
pnpm dlx prisma db push     # Aplica schema ao banco
pnpm dlx prisma studio      # Interface visual do banco

# Componentes
pnpm dlx shadcn@latest add [component]  # Adiciona componente shadcn/ui
```

## 🌐 Deploy no Vercel

### Preparação para Deploy

1. **Configure variáveis de ambiente no Vercel**:
   - `DATABASE_URL` - URL do banco (Vercel Postgres ou Supabase)
   - `NEXTAUTH_SECRET` - Secret para autenticação
   - `JWT_SECRET` - Secret para JWT
   - `PAYMENT_WALLET_ADDRESS` - Endereço da carteira Solana
   - `TWITTER_BEARER_TOKEN` - Token da API do Twitter (opcional)

2. **Migre para banco de produção**:
   - Vercel Postgres ou Supabase
   - Atualize `DATABASE_URL` no `.env`
   - Execute `pnpm dlx prisma db push`

3. **Deploy**:
```bash
vercel --prod
```

## 💳 Sistema de Pagamentos

### Planos Disponíveis
- **Mensal**: $2.99/mês - Protocolos ilimitados
- **Trimestral**: $8.07/3 meses - 10% de desconto
- **Semestral**: $14.35/6 meses - 20% de desconto

### Como Funciona
1. Usuário seleciona um plano
2. Faz pagamento em USDC/USDT para carteira Solana
3. Cola hash da transação no sistema
4. Admin aprova ou rejeita o pagamento
5. Conta Premium é ativada automaticamente

## 🔐 Segurança

- ✅ Senhas hasheadas com bcryptjs
- ✅ Autenticação JWT com cookies httpOnly
- ✅ Validação de dados no frontend e backend
- ✅ Proteção de rotas com middleware
- ✅ Separação de permissões (user/admin)

## 🎨 Personalização

### Cores dos Protocolos
- Paleta padrão com 10 cores
- Personalizável por protocolo
- Suporte a cores hex

### Redes Suportadas
- Ethereum, Arbitrum, Polygon
- Optimism, Base, Avalanche
- BSC, Fantom, Cronos, Solana

## 📱 Responsividade

- ✅ Mobile-first design
- ✅ Breakpoints: mobile, tablet, desktop
- ✅ Componentes adaptativos
- ✅ Menu mobile com hamburger

## 🔮 Próximas Implementações

### Funcionalidades Planejadas
1. **Sistema de Tarefas Completo**
   - CRUD de tarefas
   - Notificações de missões diárias
   - Integração com protocolos

2. **Feed do Twitter**
   - API Twitter v2
   - Cache inteligente
   - Análise de sentiment

3. **Analytics & Relatórios**
   - Gráficos de performance
   - Relatórios de ROI
   - Exportação de dados

4. **Integrações Blockchain**
   - Verificação automática de transações
   - Integração com wallets
   - Preços em tempo real

### Melhorias Técnicas
- [ ] Testes automatizados (Jest + Testing Library)
- [ ] CI/CD pipeline
- [ ] Monitoring e logs
- [ ] Cache com Redis
- [ ] Rate limiting

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- Email: support@droppes.com
- Discord: [Comunidade Droppes]
- Docs: [docs.droppes.com]

---

**Droppes** - Simplifique seu DeFi 💧 