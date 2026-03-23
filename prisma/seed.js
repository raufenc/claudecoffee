const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@claudecoffee.com' },
    update: { 
      role: 'ADMIN',
      password: hashedPassword
    },
    create: {
      email: 'admin@claudecoffee.com',
      name: 'Claude Yöneticisi',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin kullanıcısı başarıyla oluşturuldu.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
