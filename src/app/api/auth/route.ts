import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }
    const token = createSessionToken();
    await setSessionCookie(token);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
