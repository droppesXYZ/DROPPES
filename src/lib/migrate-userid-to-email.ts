// Script de migração: Corrige userId de UID para email em protocolos, investimentos e tasks
// Execute com: npx tsx src/lib/migrate-userid-to-email.ts

import { userService, protocolService, investmentService, taskService } from './firestore'

async function isEmail(str: string) {
  // Verifica se é um email simples
  return /@.+\..+/.test(str)
}

async function migrateCollection(collectionName: string, findAll: () => Promise<any[]>, update: (id: string, data: any) => Promise<void>) {
  const docs = await findAll()
  let count = 0
  for (const doc of docs) {
    if (!doc.userId || await isEmail(doc.userId)) continue // já está correto
    // Buscar usuário pelo UID antigo
    const user = await userService.findById(doc.userId)
    if (user && user.email) {
      await update(doc.id, { userId: user.email })
      count++
      console.log(`[${collectionName}] Corrigido: ${doc.id} (${doc.userId} -> ${user.email})`)
    } else {
      console.warn(`[${collectionName}] NÃO ENCONTRADO: ${doc.id} (userId: ${doc.userId})`)
    }
  }
  console.log(`[${collectionName}] Total corrigidos: ${count}`)
}

async function main() {
  console.log('--- MIGRAÇÃO userId (UID -> email) ---')
  await migrateCollection('protocols', async () => await protocolService.findAll(), protocolService.update)
  // await migrateCollection('investments', async () => await investmentService.findAll(), investmentService.update)
  await migrateCollection('tasks', async () => await taskService.findAll(), taskService.update)
  console.log('--- FIM DA MIGRAÇÃO ---')
}

main().catch(err => {
  console.error('Erro na migração:', err)
  process.exit(1)
}) 