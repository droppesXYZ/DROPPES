# Configuração do Stack Auth

## 1. Variáveis de Ambiente

Adicione estas variáveis ao seu arquivo `.env.local`:

```bash
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your-publishable-client-key
STACK_SECRET_SERVER_KEY=your-secret-server-key
```

## 2. Como obter as chaves

1. Acesse https://app.stack-auth.com
2. Crie uma conta (gratuita)
3. Crie um novo projeto
4. Escolha os métodos de autenticação:
   - Email/Password ✅
   - Google OAuth (opcional)
   - GitHub OAuth (opcional)
5. Copie as chaves API do dashboard

## 3. URLs importantes após configuração

- Página de cadastro: `http://localhost:3000/handler/signup`
- Página de login: `http://localhost:3000/handler/signin`
- Configurações da conta: `http://localhost:3000/handler/account-settings`

## 4. Próximos passos

Após configurar as variáveis de ambiente, vou ajudar você a:
- Integrar Stack Auth com seu sistema atual
- Migrar usuários existentes (opcional)
- Customizar os componentes de login/signup
- Implementar proteção de rotas 