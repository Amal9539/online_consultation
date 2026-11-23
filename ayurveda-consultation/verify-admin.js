const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@arayal.com' } });
  if (!admin) { console.log("ADMIN NOT FOUND"); return; }
  console.log("Admin found:", admin.email, "| role:", admin.role);

  const match = await bcrypt.compare('Admin@123', admin.password);
  console.log("Password 'Admin@123' matches:", match);
  
  if (!match) {
    console.log("Re-hashing admin password...");
    const newHash = await bcrypt.hash('Admin@123', 12);
    await prisma.user.update({ where: { email: 'admin@arayal.com' }, data: { password: newHash } });
    console.log("Password updated. Try logging in again.");
  }
}

main().catch(e => console.error("Error:", e.message)).finally(() => prisma.$disconnect());
