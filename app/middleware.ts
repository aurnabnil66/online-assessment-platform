import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === "/login" || path === "/";

  // Get token from cookies (we can also check localStorage but it's client-side)
  // For Redux Persist, we check client-side only

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
