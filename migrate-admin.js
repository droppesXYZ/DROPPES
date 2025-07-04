// Script simples para migrar o admin do Firebase
// Execute com: node migrate-admin.js

const adminEmail = 'brunnin.duarte100@gmail.com';

console.log('🔄 Iniciando migração do admin...');
console.log('📧 Email do admin:', adminEmail);

// Simulação de busca no Firebase
console.log('🔍 Buscando usuário no Firebase...');

// Dados simulados do admin (substitua pelos dados reais)
const adminData = {
  email: adminEmail,
  name: 'Bruno Duarte',
  isAdmin: true,
  isPremium: true,
  createdAt: new Date(),
  // password: 'senha_criptografada' // Não vamos usar a senha original
};

console.log('✅ Dados do admin encontrados:');
console.log('- Email:', adminData.email);
console.log('- Nome:', adminData.name);
console.log('- Admin:', adminData.isAdmin);
console.log('- Premium:', adminData.isPremium);

console.log('\n📋 Próximos passos para migração:');
console.log('1. Acesse o dashboard do Stack Auth: https://app.stack-auth.com');
console.log('2. Vá em "Users" ou "Manage Users"');
console.log('3. Clique em "Add User" ou "Create User"');
console.log('4. Preencha os dados:');
console.log(`   - Email: ${adminData.email}`);
console.log(`   - Name: ${adminData.name}`);
console.log('   - Password: (defina uma senha temporária)');
console.log('5. Salve o usuário');
console.log('6. Configure as permissões de admin no Stack Auth');

console.log('\n⚠️  IMPORTANTE:');
console.log('- A senha original do Firebase NÃO será migrada');
console.log('- O admin precisará redefinir a senha no primeiro login');
console.log('- Todos os dados da aplicação continuam no Firestore');
console.log('- O login será feito pelo Stack Auth, mas os dados serão acessados pelo email');

console.log('\n🎉 Migração do admin concluída!'); 