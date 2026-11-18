import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { identifier, newPassword, confirmPassword } = await request.json();

    if (!identifier) {
      return NextResponse.json(
        { message: "Please provide your registered email or phone number." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanIdentifier },
          { phone: cleanIdentifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email or mobile number." },
        { status: 404 }
      );
    }

    // If newPassword is provided, perform reset
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      if (confirmPassword && newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Passwords do not match." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return NextResponse.json(
        { message: "Password reset successful! You can now login with your new password." },
        { status: 200 }
      );
    }

    // Step 1: User found confirmation
    return NextResponse.json(
      {
        message: "Account verified. Please set your new password.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "Server error while processing password reset." },
      { status: 500 }
    );
  }
}
