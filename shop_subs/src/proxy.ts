import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/",
  "/customers",
  "/cars",
  "/estimates",
  "/parts-order",
];

const adminRoutes = ["/admin", "/reports", "/income", "/users"];

const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const isAdmin = request.cookies.get("is_admin")?.value === "true";

  if (
    (matchesRoute(pathname, protectedRoutes) ||
      matchesRoute(pathname, adminRoutes)) &&
    !accessToken
  ) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesRoute(pathname, adminRoutes) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/customers/:path*",
    "/cars/:path*",
    "/estimates/:path*",
    "/parts-order/:path*",
    "/admin/:path*",
    "/reports/:path*",
    "/income/:path*",
    "/users/:path*",
  ],
};
