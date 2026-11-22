import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey =
  process.env.JWT_SECRET ||
  "5c9f32e5c58400718cee118419782b4f0df6bb7dcfec6507e25db79e9a877514";

const secret = new TextEncoder().encode(secretKey);

// High-security response headers
function applySecurityHeaders(response) {
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(self), geolocation=()"
  );
  return response;
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isApiRoute = path.startsWith("/api/");
  const isProtectedPath =
    path.startsWith("/patient") ||
    path.startsWith("/admin") ||
    path.startsWith("/api/patient") ||
    path.startsWith("/api/admin");

  if (!isProtectedPath) {
    const res = NextResponse.next();
    return applySecurityHeaders(res);
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (isApiRoute) {
      return applySecurityHeaders(
        NextResponse.json({ message: "Authentication required." }, { status: 401 })
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    // Doctor / Admin authorization check
    if (
      (path.startsWith("/admin") || path.startsWith("/api/admin")) &&
      payload.role !== "ADMIN"
    ) {
      if (isApiRoute) {
        return applySecurityHeaders(
          NextResponse.json(
            { message: "Access forbidden: Doctor/Admin privileges required." },
            { status: 403 }
          )
        );
      }
      return NextResponse.redirect(new URL("/patient/dashboard", request.url));
    }

    // Patient authorization check
    if (
      (path.startsWith("/patient") || path.startsWith("/api/patient")) &&
      payload.role !== "PATIENT" &&
      payload.role !== "ADMIN"
    ) {
      if (isApiRoute) {
        return applySecurityHeaders(
          NextResponse.json({ message: "Access forbidden." }, { status: 403 })
        );
      }
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    const res = NextResponse.next();
    return applySecurityHeaders(res);
  } catch (err) {
    if (isApiRoute) {
      return applySecurityHeaders(
        NextResponse.json(
          { message: "Session expired or invalid. Please re-authenticate." },
          { status: 401 }
        )
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/patient/:path*",
    "/admin/:path*",
    "/api/patient/:path*",
    "/api/admin/:path*",
  ],
};
