<<<<<<< HEAD
// export async function POST(request) {
//   try {
//     const body = await request.json();

//     console.log("Received:", body);

//     return Response.json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       {
//         success: false,
//         message: "Registration failed",
//       },
//       { status: 400 }
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime


export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone || null,
        password: hashedPassword,
        role: "PATIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    console.log("USER CREATED:", user);

    return NextResponse.json(
      {
        message: "Registration successful.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
=======
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, age, gender, address } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        phone: phone || null,
        password: hashedPassword,
        role: "PATIENT",
        age: age ? Number(age) : null,
        gender: gender || null,
        address: address || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { message: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
