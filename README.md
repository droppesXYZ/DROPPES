# Droppes - Gerenciador de Airdrops

**🚀 Deploy Status: Environment variables configured ✅**

Plataforma completa para gerenciar seus investimentos em protocolos cripto e maximizar seus airdrops.

## 🚀 Tecnologias

- **Framework**: Next.js 15.3.4 com App Router
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **UI**: Radix UI (componentes acessíveis)
- **Backend**: API Routes do Next.js
- **Banco de dados**: Prisma ORM + Firebase/Firestore
- **Autenticação**: NextAuth.js + JWT
- **Estado**: Zustand
- **Validação**: Zod

## ⚙️ Configuração do Ambiente

### 1. Clonar o repositório
```bash
git clone <repo-url>
cd DROPPES-main
```

### 2. Instalar dependências
```bash
pnpm install
```

### 3. Configurar variáveis de ambiente
```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar com seus valores reais
nano .env
```

**⚠️ IMPORTANTE**: Configure todas as variáveis do arquivo `.env`:
- Firebase: Criar projeto no console.firebase.google.com
- JWT_SECRET: Usar um valor forte (32+ caracteres)
- Email: Configurar SMTP ou usar Gmail com App Password
- Database: Configurar PostgreSQL ou usar outro provider

### 4. Configurar banco de dados
```bash
# Executar migrações do Prisma
pnpm prisma generate
pnpm prisma db push
```

### 5. Iniciar servidor
```bash
pnpm dev
```

## 🔒 Segurança

- ✅ JWT com secret forte configurável
- ✅ Senhas criptografadas com bcrypt
- ✅ Validação de inputs com Zod
- ✅ TypeScript para type safety
- ✅ CSP headers configurados

## 📁 Estrutura do Projeto

```
src/
├── app/           # App Router (páginas e layouts)
├── components/    # Componentes reutilizáveis
├── lib/          # Utilitários e configurações
└── generated/    # Código gerado (Prisma)
```

## 🔧 Scripts Disponíveis

```bash
pnpm dev      # Servidor de desenvolvimento
pnpm build    # Build de produção
pnpm start    # Servidor de produção
pnpm lint     # Verificar código
```

## 🚨 Notas de Segurança

- **NUNCA** commite o arquivo `.env` no Git
- Use senhas fortes para todas as variáveis
- Configure Firebase rules adequadamente
- Revise permissões de banco de dados
