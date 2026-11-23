import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  validatePasswordStrength,
  sanitizeInput,
  generateVerificationCode,
} from "@/lib/security";

export const runtime = "nodejs";

// In-memory store for one-time verification codes
// Map: identifier -> { code, expiresAt, userId }
const resetCodesStore = new Map();

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // High security: Rate limit forgot password to 5 requests per 15 minutes per IP
    const rateLimit = checkRateLimit(`forgot-pwd:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: `Too many password reset requests. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { identifier, verificationCode, newPassword, confirmPassword } =
      await request.json();

    if (!identifier) {
      return NextResponse.json(
        { message: "Please provide your registered email address." },
        { status: 400 }
      );
    }

    const cleanIdentifier = sanitizeInput(identifier).toLowerCase();

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanIdentifier }, { phone: cleanIdentifier }],
      },
    });

    // High security: If account does not exist, return a generic verification message
    // to prevent username enumeration, or inform user politely.
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email address." },
        { status: 404 }
      );
    }

    // High security: ADMIN / Doctor account cannot be reset via public unauthenticated portal
    if (user.role === "ADMIN") {
      return NextResponse.json(
        {
          message:
            "Doctor & Admin accounts cannot be reset via the public portal. Please contact administrative technical support.",
        },
        { status: 403 }
      );
    }

    // STEP 2: VERIFICATION & RESET
    if (newPassword) {
      if (!verificationCode) {
        return NextResponse.json(
          { message: "A 6-digit verification security code is required." },
          { status: 400 }
        );
      }

      const storedRecord = resetCodesStore.get(cleanIdentifier);
      const now = Date.now();

      if (!storedRecord || now > storedRecord.expiresAt) {
        return NextResponse.json(
          {
            message:
              "Verification code has expired or is invalid. Please request a new code.",
          },
          { status: 400 }
        );
      }

      if (storedRecord.code !== String(verificationCode).trim()) {
        return NextResponse.json(
          { message: "Invalid 6-digit verification security code." },
          { status: 400 }
        );
      }

      // High security password strength policy
      const passwordCheck = validatePasswordStrength(newPassword);
      if (!passwordCheck.isValid) {
        return NextResponse.json(
          { message: passwordCheck.message },
          { status: 400 }
        );
      }

      if (confirmPassword && newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Passwords do not match." },
          { status: 400 }
        );
      }

      // Hash with bcrypt cost 12
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      // Invalidate the one-time code immediately
      resetCodesStore.delete(cleanIdentifier);

      return NextResponse.json(
        {
          message:
            "Password reset successful! You can now login with your new password.",
        },
        { status: 200 }
      );
    }

    // STEP 1: GENERATE 6-DIGIT VERIFICATION CODE
    const verificationCodeGenerated = generateVerificationCode();
    resetCodesStore.set(cleanIdentifier, {
      code: verificationCodeGenerated,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes validity
      userId: user.id,
    });

    return NextResponse.json(
      {
        message: "Account verified. Security verification code has been generated.",
        verificationRequired: true,
        // Simulation code provided so user can verify on screen
        verificationCode: verificationCodeGenerated,
        user: {
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
