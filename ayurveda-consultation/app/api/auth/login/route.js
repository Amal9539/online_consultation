import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { checkRateLimit, getClientIp, sanitizeInput } from "@/lib/security";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // High security: Rate limit login attempts to 5 per minute per IP
    const rateLimit = checkRateLimit(`login:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: `Too many login attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email address and password are required." },
        { status: 400 }
      );
    }

    // Validate it looks like an email address
    const cleanInput = sanitizeInput(email).toLowerCase();
    if (!cleanInput.includes("@")) {
      return NextResponse.json(
        { message: "Please enter a valid email address to login." },
        { status: 400 }
      );
    }

    // Login by email only — email is the unique account identifier (username)
    const user = await prisma.user.findUnique({
      where: { email: cleanInput },
    });

    if (!user || !user.password) {
      // Constant-time dummy compare to prevent timing enumeration attacks
      await bcrypt.compare(
        password,
        "$2a$12$e80yqX3gZ4t2kZvZv8qF0e1yWv2qF0e1yWv2qF0e1yWv2qF0e1yWv"
      );
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Create JWT with secure 24-hour expiration
    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "An unexpected authentication error occurred." },
      { status: 500 }
    );
  }
}
