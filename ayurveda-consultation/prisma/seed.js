const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 12);
<<<<<<< HEAD
  const patientPassword = await bcrypt.hash("Patient@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@arayal.com" },
    update: {},
=======

  const admin = await prisma.user.upsert({
    where: { email: "admin@arayal.com" },
    update: {
      password: adminPassword,
      role: "ADMIN"
    },
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
    create: {
      name: "Dr. Princy",
      email: "admin@arayal.com",
      phone: "+91 9000000000",
      password: adminPassword,
      role: "ADMIN"
    }
  });

<<<<<<< HEAD
  const patient = await prisma.user.upsert({
    where: { email: "patient@arayal.com" },
    update: {},
    create: {
      name: "Anu Krishnan",
      email: "patient@arayal.com",
      phone: "+91 9876543210",
      password: patientPassword,
      role: "PATIENT",
      age: 32,
      gender: "Female",
      address: "Kochi, Kerala"
    }
  });

  const count = await prisma.appointment.count({
    where: { patientId: patient.id }
  });

  if (count === 0) {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        consultationType: "Online Consultation",
        date,
        time: "10:00 AM",
        reason: "Initial Ayurveda consultation",
        zoomLink: "https://zoom.us/",
        status: "SCHEDULED"
      }
    });
  }

  console.log("Seed complete.");
  console.log("Admin: admin@arayal.com / Admin@123");
  console.log("Patient: patient@arayal.com / Patient@123");
=======
  console.log("Seed complete.");
  console.log("Admin: admin@arayal.com / Admin@123");
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
