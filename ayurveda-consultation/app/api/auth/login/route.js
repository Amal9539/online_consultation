import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email/Phone and password are required." },
        { status: 400 }
      );
    }

    const cleanInput = email.trim().toLowerCase();

    // Support login via either email OR phone number
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { phone: cleanInput },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email/phone or password." },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "User account is missing password information." },
        { status: 500 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email/phone or password." },
        { status: 401 }
      );
    }

    // Create JWT
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
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
