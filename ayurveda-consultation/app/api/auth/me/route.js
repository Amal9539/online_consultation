import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user.userId ?? user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}