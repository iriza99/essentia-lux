import { NextResponse, type NextRequest } from "next/server";
import { STORE_ENABLED } from "@/config/features";

// Secciones que forman parte de la tienda + login de usuarios.
const STORE_PREFIXES = [
  "/tienda",
  "/carrito",
  "/login",
  "/registro",
  "/mi-cuenta",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Mientras la tienda está oculta, cualquier acceso directo por URL a esas
  // secciones se manda a la home (así nadie ve la tienda a medio montar).
  if (!STORE_ENABLED && STORE_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protección de /mi-cuenta cuando la tienda está activa: comprobamos que
  // exista la cookie de sesión de Supabase (sin importar nada de Supabase,
  // para no romper el Edge Runtime). La validación real la hace la página.
  if (pathname.startsWith("/mi-cuenta")) {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

    if (!hasSession) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tienda/:path*",
    "/carrito/:path*",
    "/login/:path*",
    "/registro/:path*",
    "/mi-cuenta/:path*",
  ],
};
