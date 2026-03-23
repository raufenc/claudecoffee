const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('Models in Prisma Client:', Object.keys(prisma).filter(k => k[0] !== '_' && k[0] === k[0].toLowerCase()));
process.exit(0);
