import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthenticatedFromRequest(request)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
