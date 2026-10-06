import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const session = token ? await verifySessionToken(token) : null;

  const { pathname } = req.nextUrl;

  // /admin ต้องเป็น ADMIN เท่านั้น — ยังเด้งไป /login เหมือนเดิม
  // เพราะคนที่จะเป็น Admin ต้องมีบัญชีอยู่แล้วเสมอ (ไม่ได้สมัครเองผ่านหน้า public)
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // /profile ต้อง login ก่อน เหมือน /planner
  if (pathname.startsWith("/profile")) {
    if (!session) {
      const registerUrl = new URL("/register", req.url);
      registerUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(registerUrl);
    }
    return NextResponse.next();
  }

  // /planner เด้งไป /register ก่อน เพราะคนส่วนใหญ่ที่เจอหน้านี้ครั้งแรกยังไม่มีบัญชี
  if (pathname.startsWith("/planner")) {
    if (!session) {
      const registerUrl = new URL("/register", req.url);
      registerUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(registerUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/planner/:path*",
    "/api/planner/:path*",
    "/profile/:path*",
  ],
};
