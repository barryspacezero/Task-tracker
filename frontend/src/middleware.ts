import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // if trying to access dashboard without token, redirect to login
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // if already logged in and trying to access login/signup, redirect to dashboard
    if ((pathname === "/login" || pathname === "/sign-up") && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/sign-up"],
};
