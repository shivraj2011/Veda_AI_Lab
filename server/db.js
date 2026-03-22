const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient({
    // Optional: Log queries for debugging if needed
    // log: ['query', 'info', 'warn', 'error'],
});

module.exports = prisma;
