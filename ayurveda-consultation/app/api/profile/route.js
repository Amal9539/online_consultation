import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sanitizeInput } from "@/lib/security";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const profile = await prisma.user.findUnique({
      where: { id: Number(user.userId) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        role: true,
      },
    });

    return NextResponse.json({ user: profile });
  } catch (e) {
    console.error("PROFILE GET ERROR:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, phone, age, gender, address } = body;

    // High security: Sanitize text inputs against stored XSS
    const cleanName = name ? sanitizeInput(name) : undefined;
    const cleanPhone = phone ? sanitizeInput(phone) : undefined;
    const cleanGender = gender ? sanitizeInput(gender) : undefined;
    const cleanAddress = address ? sanitizeInput(address) : undefined;

    let cleanAge = null;
    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (!isNaN(parsedAge) && parsedAge >= 0 && parsedAge <= 130) {
        cleanAge = parsedAge;
      }
    }

    const profile = await prisma.user.update({
      where: { id: Number(user.userId) },
      data: {
        ...(cleanName !== undefined ? { name: cleanName } : {}),
        ...(cleanPhone !== undefined ? { phone: cleanPhone } : {}),
        age: cleanAge,
        ...(cleanGender !== undefined ? { gender: cleanGender } : {}),
        ...(cleanAddress !== undefined ? { address: cleanAddress } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        role: true,
      },
    });

    return NextResponse.json({ user: profile });
  } catch (e) {
    console.error("PROFILE UPDATE ERROR:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
