const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@claudecoffee.com';
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { 
      role: 'ADMIN',
      password: hashedPassword,
      name: 'Sistem Yöneticisi'
    },
    create: {
      email: adminEmail,
      name: 'Sistem Yöneticisi',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  });

  console.log('Admin user updated/created:', admin.email);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
