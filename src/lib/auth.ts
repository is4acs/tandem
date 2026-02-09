import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_COOKIE = "tandem_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-me";

function hashToken(password: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SESSION_SECRET);
  let hash = 0;
  for (const byte of data) {
    hash = ((hash << 5) - hash + byte) | 0;
  }
  return Math.abs(hash).toString(36);
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  return hashToken(ADMIN_PASSWORD + Date.now().toString());
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export function isAuthenticatedFromRequest(request: NextRequest): boolean {
  const session = request.cookies.get(SESSION_COOKIE);
  return !!session?.value;
}
