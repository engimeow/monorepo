import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // // private route
  // if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
