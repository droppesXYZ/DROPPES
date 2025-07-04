import { userService } from './firestore'

async function makeAdmin() {
  const email = 'brunnin.duarte100@gmail.com'
  
  console.log('🔧 Configurando admin para:', email)
  
  const user = await userService.findByEmail(email)
  if (!user) {
    console.error('❌ Usuário não encontrado:', email)
    console.log('💡 Dica: O usuário deve fazer login primeiro para ser criado no sistema')
    process.exit(1)
  }
  
  if (user.isAdmin) {
    console.log('✅ Usuário já é admin:', email)
    process.exit(0)
  }
  
  await userService.update(user.id, { isAdmin: true })
  console.log('✅ Usuário atualizado para admin com sucesso:', email)
  process.exit(0)
}

makeAdmin().catch((err) => {
  console.error('❌ Erro ao atualizar usuário:', err)
  process.exit(1)
}) 