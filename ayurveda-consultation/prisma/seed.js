const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@arayal.com" },
    update: {
      password: adminPassword,
      role: "ADMIN"
    },
    create: {
      name: "Dr. Princy",
      email: "admin@arayal.com",
      phone: "+91 9000000000",
      password: adminPassword,
      role: "ADMIN"
    }
  });

  console.log("Seed complete.");
  console.log("Admin: admin@arayal.com / Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });