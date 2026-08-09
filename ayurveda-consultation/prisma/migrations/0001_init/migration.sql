CREATE TYPE "Role" AS ENUM ('PATIENT', 'ADMIN');
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "ReportType" AS ENUM ('PDF', 'IMAGE');

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "password" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'PATIENT',
  "age" INTEGER,
  "gender" TEXT,
  "address" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Appointment" (
  "id" SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL,
  "consultationType" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "time" TEXT NOT NULL,
  "reason" TEXT,
  "zoomLink" TEXT,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "MedicalReport" (
  "id" SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "storedName" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "type" "ReportType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MedicalReport_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Prescription" (
  "id" SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL,
  "createdById" INTEGER NOT NULL,
  "diagnosis" TEXT,
  "medicines" TEXT NOT NULL,
  "instructions" TEXT,
  "pdfPath" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Prescription_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Appointment_patientId_idx" ON "Appointment"("patientId");
CREATE INDEX "MedicalReport_patientId_idx" ON "MedicalReport"("patientId");
CREATE INDEX "Prescription_patientId_idx" ON "Prescription"("patientId");
