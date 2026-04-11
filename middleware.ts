import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define public paths (accessible without authentication)
  const isPublicPath = path === "/login" || path === "/" || path === "/signup";

  // Define protected paths (require authentication)
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/exam") ||
    path === "/create-test";

  // Check for auth token in cookies (more reliable for middleware)
  // You can set this cookie when user logs in
  const authToken = request.cookies.get("auth-token")?.value;

  // Check for Redux Persist data in cookies (optional)
  const persistRoot = request.cookies.get("persist:root")?.value;

  // If trying to access protected route without authentication
  if (isProtectedPath && !authToken) {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    // Add a redirect parameter to send user back after login
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login page, redirect to dashboard
  if (isPublicPath && authToken && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
