import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieName = process.env.COOKIE_NAME || "";
  const jwtToken = request.cookies.get(cookieName);

  // /top ページでログイン済みの場合は /matches にリダイレクト
  if (request.nextUrl.pathname === "/top" && jwtToken) {
    return NextResponse.redirect(new URL("/matches", request.url));
  }

  // /login ページでログイン済みの場合は /matches にリダイレクト
  if (request.nextUrl.pathname === "/login" && jwtToken) {
    return NextResponse.redirect(new URL("/matches", request.url));
  }

  // /register ページでログイン済みの場合は /matches にリダイレクト
  if (request.nextUrl.pathname === "/register" && jwtToken) {
    return NextResponse.redirect(new URL("/matches", request.url));
  }

  // /matches ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname === "/matches" && !jwtToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // /matches/[id] ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname.startsWith("/matches/") && !jwtToken) {
    const segments = request.nextUrl.pathname.split("/");
    if (segments.length === 3 && segments[2]) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // /management/[id] ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname.startsWith("/management/") && !jwtToken) {
    const segments = request.nextUrl.pathname.split("/");
    if (segments.length === 3 && segments[2]) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // /create ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname === "/create" && !jwtToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // /management ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname === "/management" && !jwtToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // /my ページで未ログインの場合は /login にリダイレクト
  if (request.nextUrl.pathname === "/my" && !jwtToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 他のリクエストはそのまま進める
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/top",
    "/login",
    "/register",
    "/matches",
    "/matches/:id*",
    "/management",
    "/management/:id*",
    "/create",
    "/my"
  ],
};
