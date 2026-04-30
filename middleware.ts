import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabase: Awaited<ReturnType<typeof createSupabaseServer>> | null = null;

  function createSupabaseServer() {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
          },
        },
      }
    );
  }

  try {
    supabase = createSupabaseServer();
  } catch {
    return NextResponse.next();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = ["/dashboard", "/history"].some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );
  const isAuthPage = ["/login", "/register"].some(
    (p) => request.nextUrl.pathname === p
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
