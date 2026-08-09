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

export async function getCurrentUser(request) {
  const token = request.cookies.get("token")?.value;

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
}
