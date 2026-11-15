import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "development-secret"
);

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith("/patient") && !path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (path.startsWith("/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/patient/dashboard", request.url));
    }

    if (path.startsWith("/patient") && payload.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/patient/:path*", "/admin/:path*"]
};
