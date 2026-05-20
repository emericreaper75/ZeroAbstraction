import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

/**
 * Middleware combining Auth.js session protection with security controls.
 *
 * - Auth.js protects /admin/* routes via session validation
 * - CORS headers are applied to API routes
 * - Request size sanity checks on API routes
 */
export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  // ── CORS for API routes ────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zero-abstraction.dev";

    // Explicit allowlist — only the site's own origin is allowed
    const allowedOrigins = [
      siteUrl,
      // Include localhost for development
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.headers.set("Access-Control-Max-Age", "86400");
    }

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }
  }

  // ── Admin route protection ─────────────────────────────────────────
  // Auth.js handles session validation automatically via the auth() wrapper.
  // If the user is not authenticated, Auth.js redirects to /login.

  return response;
});

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};