import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  if (token) {
    const secret = new TextEncoder().encode("sasdasfaHABSHecret");
    try {
      const { payload } = await jwtVerify(token.value, secret);
      const expirationTime = payload?.exp ? payload.exp * 1000 : 0; // Use optional chaining
      const currentTime = Date.now();
      if (expirationTime < currentTime) {
        // Token has expired, clear the cookie
        const expiredCookie = `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`; // Clear cookie by setting an expired date
        return NextResponse.redirect(new URL("/login", request.url), {
          headers: { "Set-Cookie": expiredCookie },
        });
      }
    } catch (error) {
      // Handle JWT verification error
      console.error("JWT verification error:", error);
      // Clear the cookie if verification fails
      const expiredCookie = `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`; // Clear cookie by setting an expired date
      return NextResponse.redirect(new URL("/login", request.url), {
        headers: { "Set-Cookie": expiredCookie },
      });
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/profile"],
};
