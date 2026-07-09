import { NextResponse, type NextRequest } from "next/server";

// Lightweight route protection. We deliberately DON'T import @supabase/ssr
// here: it pulls @supabase/supabase-js (Node-only APIs) into the Edge Runtime
// where middleware executes, which crashes with "__dirname is not defined".
// This middleware only checks whether a Supabase auth cookie is present; the
// actual session validation still happens server-side in the /mi-cuenta page
// via supabase.auth.getUser(), so an invalid/expired cookie is still rejected.
export function middleware(request: NextRequest) {
  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

  if (!hasSession) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mi-cuenta/:path*"],
};
