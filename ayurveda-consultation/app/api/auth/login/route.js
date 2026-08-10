import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log("LOGIN EMAIL:", normalizedEmail);

    // Check database connection/user
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    console.log("USER RESULT:", user);

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!user.password) {
      console.error("User does not have a password hash");

      return NextResponse.json(
        {
          message: "User account is missing password information.",
        },
        { status: 500 }
      );
    }

    console.log("PASSWORD HASH EXISTS");

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD CHECK:", validPassword);

    if (!validPassword) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
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

    console.log("TOKEN CREATED");

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
    console.error("================================");
    console.error("LOGIN ERROR:");
    console.error(error);
    console.error("================================");

    return NextResponse.json(
      {
        message: "Server error",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}
