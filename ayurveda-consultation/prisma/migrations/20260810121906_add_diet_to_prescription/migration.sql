-- DropIndex
DROP INDEX "Appointment_patientId_idx";

-- DropIndex
DROP INDEX "MedicalReport_patientId_idx";

-- DropIndex
DROP INDEX "Prescription_patientId_idx";

-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "diet" TEXT;
