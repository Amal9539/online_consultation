import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "development-secret"
);

export async function createToken(user) {
  return new SignJWT({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

<<<<<<< HEAD
function readToken(request) {
  // App Router / middleware (NextRequest)
  if (typeof request.cookies?.get === "function") {
    return request.cookies.get("token")?.value;
  }
  // Pages Router API (Node request): cookies is a plain object
  if (request.cookies && typeof request.cookies === "object") {
    return request.cookies.token;
  }
  // Fallback: parse the raw Cookie header
  const header = request.headers?.cookie || "";
  const match = header.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function getCurrentUser(request) {
  const token = readToken(request);
=======
export async function getCurrentUser(request) {
  const token = request.cookies.get("token")?.value;
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d

  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireUser(request) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function requireAdmin(request) {
  const user = await requireUser(request);

  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return user;
<<<<<<< HEAD
}
=======
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
