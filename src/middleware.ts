// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   if (req.nextUrl.pathname.startsWith("/dashboard")) {
//     if (!session) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   const emailLinkError = "Email link is invalid or has expired";
//   if (
//     req.nextUrl.searchParams.get("error_description") === emailLinkError &&
//     req.nextUrl.pathname !== "/signup"
//   ) {
//     return NextResponse.redirect(
//       new URL(
//         `/signup?error_description=${req.nextUrl.searchParams.get(
//           "error_description"
//         )}`,
//         req.url
//       )
//     );
//   }

//   if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
//     if (session) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }
//   return res;
// }

// // export const config = {
// //   matcher: "/((?!ws$).*)",
// // };
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const emailLinkError = "Email link is invalid or has expired";
  const errorDescription = req.nextUrl.searchParams.get("error_description");

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      console.error("Unauthorized access to dashboard");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Handle email link errors
  if (
    errorDescription === emailLinkError &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL(`/signup?error_description=${errorDescription}`, req.url)
    );
  }

  // Redirect logged-in users from public pages
  if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Safe fallback
  return res;
}

// Matcher configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
