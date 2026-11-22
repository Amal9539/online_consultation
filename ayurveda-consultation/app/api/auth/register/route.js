import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  validatePasswordStrength,
  sanitizeInput,
} from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const isLocalhost =
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp === "localhost" ||
      clientIp.includes("127.0.0.1");

    // High security: Rate limit registrations (relaxed on localhost for testing)
    const maxAttempts = isLocalhost ? 50 : 5;
    const rateLimit = checkRateLimit(`register:${clientIp}`, maxAttempts, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: `Too many registration attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, password, confirmPassword } = body;

    // 1. Required fields check
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Full Name, Email Address, and Password are required." },
        { status: 400 }
      );
    }

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanPhone = phone ? sanitizeInput(phone) : null;

    // 2. Name validation
    if (cleanName.length < 2) {
      return NextResponse.json(
        { message: "Full Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    // 4. Phone validation (if provided)
    if (cleanPhone) {
      const cleanDigits = cleanPhone.replace(/[^0-9]/g, "");
      if (cleanDigits.length < 7 || cleanDigits.length > 15) {
        return NextResponse.json(
          { message: "Please provide a valid contact number (7 to 15 digits)." },
          { status: 400 }
        );
      }
    }

    // 5. Password confirmation check (if provided in payload)
    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match. Please re-enter your password." },
        { status: 400 }
      );
    }

    // 6. High security password strength policy
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { message: passwordCheck.message },
        { status: 400 }
      );
    }

    // 7. Check existing email
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "This email address is already registered. Please login instead." },
        { status: 409 }
      );
    }

    // 8. Hash password with bcrypt cost 12
    const hashedPassword = await bcrypt.hash(password, 12);

    // 9. Create user in database
    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password: hashedPassword,
        role: "PATIENT", // Enforce PATIENT role strictly
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully! You can now login.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // Diagnostic error clarity if database is down
    const errString = String(error?.message || error);
    if (
      errString.includes("Can't reach database server") ||
      errString.includes("connect ECONNREFUSED") ||
      errString.includes("PrismaClientInitializationError")
    ) {
      return NextResponse.json(
        {
          message:
            "Database server is currently unavailable. Please verify your PostgreSQL/Docker container is running.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
