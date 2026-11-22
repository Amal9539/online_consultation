import { SignJWT, jwtVerify } from "jose";

const secretKey =
  process.env.JWT_SECRET ||
  "5c9f32e5c58400718cee118419782b4f0df6bb7dcfec6507e25db79e9a877514";

const secret = new TextEncoder().encode(secretKey);

export async function createToken(user) {
  return new SignJWT({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // 24 hours high-security session
    .sign(secret);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

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
