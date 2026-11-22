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

    // High security: Rate limit registrations to 5 per 15 minutes per IP
    const rateLimit = checkRateLimit(`register:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: `Too many registration attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanPhone = phone ? sanitizeInput(phone) : null;

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // High security: Validate password strength
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { message: passwordCheck.message },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email is already registered. Please login instead." },
        { status: 409 }
      );
    }

    // High-cost salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password: hashedPassword,
        role: "PATIENT", // Enforce PATIENT role, never allow role injection
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
        message: "Registration successful. You can now login.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "An error occurred while creating your account." },
      { status: 500 }
    );
  }
}
