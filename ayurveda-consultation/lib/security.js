import crypto from "crypto";

// ============================================================================
// 1. IN-MEMORY SLIDING WINDOW RATE LIMITER
// ============================================================================
const rateLimitStore = new Map();

// Periodic cleanup every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks and increments rate limit for an identifier (e.g. IP + action)
 * @param {string} key - Unique key like `login:192.168.1.1`
 * @param {number} maxAttempts - Max allowed requests within window
 * @param {number} windowMs - Window duration in milliseconds (default: 60s)
 * @returns {{ allowed: boolean, remaining: number, resetInSeconds: number }}
 */
export function checkRateLimit(key, maxAttempts = 5, windowMs = 60 * 1000) {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    const resetInSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  record.count += 1;
  const resetInSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetInSeconds,
  };
}

/**
 * Extracts client IP address from Next.js request headers
 */
export function getClientIp(request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "127.0.0.1"
  );
}

// ============================================================================
// 2. PASSWORD STRENGTH VALIDATION
// ============================================================================
/**
 * Enforces high-security password requirements
 */
export function validatePasswordStrength(password) {
  if (!password || typeof password !== "string") {
    return { isValid: false, message: "Password is required." };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long for high security.",
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: "Password must be under 128 characters.",
    };
  }

  // Must contain at least one letter and at least one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      message: "Password must contain both letters and numbers.",
    };
  }

  return { isValid: true, message: "Password meets security standards." };
}

// ============================================================================
// 3. INPUT SANITIZATION (ANTI-XSS)
// ============================================================================
/**
 * Strips HTML tags, script vectors, and dangerous characters from user text
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

// ============================================================================
// 4. VERIFICATION CODE GENERATION (CRYPTO-SECURE)
// ============================================================================
/**
 * Generates a cryptographically secure 6-digit numeric verification code
 */
export function generateVerificationCode() {
  return String(crypto.randomInt(100000, 999999));
}
