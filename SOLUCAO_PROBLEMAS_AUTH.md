# 🔧 Solução para Problemas de Autenticação

## 🚨 Problemas Identificados

### 1. **Contas Firebase não conseguem fazer login**
- **Causa**: Stack Auth e Firebase são sistemas separados
- **Solução**: Migração de dados ou sistema híbrido

### 2. **Confusão de contas Google OAuth**
- **Causa**: Configuração incorreta do OAuth no Stack Auth
- **Solução**: Reconfigurar OAuth e limpar cache

## 🛠️ Soluções Implementadas

### **Opção A: Sistema Híbrido (Recomendado)**

#### 1. **Configurar Stack Auth para novos usuários**
```bash
# Acesse o dashboard do Stack Auth
https://app.stack-auth.com

# Configure o OAuth do Google corretamente:
# 1. Vá em "Authentication" > "OAuth Providers"
# 2. Configure Google OAuth com as credenciais corretas
# 3. Certifique-se de que o domínio está autorizado
```

#### 2. **Manter Firebase para usuários existentes**
Vou criar um sistema que verifica ambos os sistemas:

```typescript
// src/lib/auth-hybrid.ts
export async function authenticateUser(email: string, password: string) {
  // 1. Tentar Stack Auth primeiro
  try {
    const stackUser = await stackAuth.authenticate(email, password)
    return { user: stackUser, source: 'stack' }
  } catch (error) {
    // 2. Se falhar, tentar Firebase
    try {
      const firebaseUser = await firebaseAuth.authenticate(email, password)
      return { user: firebaseUser, source: 'firebase' }
    } catch (firebaseError) {
      throw new Error('Credenciais inválidas')
    }
  }
}
```

### **Opção B: Migração Completa**

#### 1. **Migrar usuários do Firebase para Stack Auth**
```bash
# Execute o script de migração
npm run migrate-users
```

#### 2. **Configurar admin no Stack Auth**
```bash
# Use a API para configurar admin
curl -X POST http://localhost:3000/api/admin/setup-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "droppes.xyz@gmail.com"}'
```

## 🔧 Passos para Corrigir o OAuth

### 1. **Limpar Cache do Navegador**
```bash
# No Chrome/Firefox:
# 1. Ctrl+Shift+Delete
# 2. Limpar cookies e cache
# 3. Fechar e reabrir o navegador
```

### 2. **Reconfigurar OAuth no Stack Auth**
```bash
# 1. Acesse: https://app.stack-auth.com
# 2. Vá em "Authentication" > "OAuth Providers"
# 3. Remova a configuração atual do Google
# 4. Adicione novamente com as credenciais corretas
# 5. Configure os domínios autorizados:
#    - localhost:3000 (desenvolvimento)
#    - seu-dominio.com (produção)
```

### 3. **Verificar Configuração do Google Cloud**
```bash
# 1. Acesse: https://console.cloud.google.com
# 2. Vá em "APIs & Services" > "Credentials"
# 3. Verifique se o OAuth Client ID está correto
# 4. Confirme os URIs de redirecionamento:
#    - http://localhost:3000/handler/oauth-callback
#    - https://seu-dominio.com/handler/oauth-callback
```

## 📋 Checklist de Correção

### ✅ **Para o Problema do OAuth:**
- [ ] Limpar cache do navegador
- [ ] Reconfigurar OAuth no Stack Auth
- [ ] Verificar credenciais do Google Cloud
- [ ] Testar login com conta correta

### ✅ **Para o Problema do Firebase:**
- [ ] Decidir entre sistema híbrido ou migração
- [ ] Se híbrido: implementar verificação dupla
- [ ] Se migração: executar script de migração
- [ ] Configurar admin no Stack Auth

### ✅ **Para Configurar Admin:**
- [ ] Acessar dashboard do Stack Auth
- [ ] Ir em "Users" > "Manage Users"
- [ ] Encontrar o usuário `droppes.xyz@gmail.com`
- [ ] Adicionar role "admin" ou "owner"
- [ ] Salvar configurações

## 🚀 Próximos Passos

1. **Imediato**: Reconfigurar OAuth no Stack Auth
2. **Curto prazo**: Decidir estratégia (híbrido vs migração)
3. **Médio prazo**: Implementar solução escolhida
4. **Longo prazo**: Migrar completamente para Stack Auth

## 📞 Suporte

Se precisar de ajuda adicional:
1. Verifique os logs do servidor
2. Teste com diferentes navegadores
3. Verifique a configuração do Google Cloud Console
4. Consulte a documentação do Stack Auth 