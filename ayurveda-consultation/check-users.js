const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, password: true }
  });
  console.log("Users in database:");
  users.forEach(u => {
    console.log(`  ID:${u.id} | ${u.role} | ${u.email} | name: ${u.name} | hasPassword: ${!!u.password}`);
  });
  if (users.length === 0) {
    console.log("  NO USERS FOUND — database is empty, need to run seed");
  }
}

main().catch(e => console.error("Error:", e.message)).finally(() => prisma.$disconnect());
