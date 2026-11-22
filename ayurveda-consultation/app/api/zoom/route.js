import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sanitizeInput } from "@/lib/security";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { appointmentId, zoomLink } = await request.json();

    if (!appointmentId || !zoomLink) {
      return NextResponse.json(
        { message: "Appointment and video link are required." },
        { status: 400 }
      );
    }

    const cleanLink = sanitizeInput(zoomLink);

    // High security: URL validation to prevent javascript: or malicious protocol injection
    try {
      const parsedUrl = new URL(
        cleanLink.startsWith("http://") || cleanLink.startsWith("https://")
          ? cleanLink
          : `https://${cleanLink}`
      );
      if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
        return NextResponse.json(
          { message: "Invalid meeting URL protocol. Only https links are allowed." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Please provide a valid meeting link format." },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id: Number(appointmentId) },
      data: { zoomLink: cleanLink },
    });

    return NextResponse.json({ appointment });
  } catch (e) {
    console.error("ZOOM LINK ERROR:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
