import { NextResponse } from "next/server";

export function proxy(request) {
  const isAuthorized = request.cookies.get("adminAuthorized");

  if (!isAuthorized || isAuthorized.value !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};