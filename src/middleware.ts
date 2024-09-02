import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Log token and path for debugging
  console.log(`Token: ${token ? JSON.stringify(token) : 'Not Found'}, Path: ${pathname}`);

  // Allow access to specific paths without authentication
  if (
    pathname.startsWith('/_next/') ||  // Next.js internal paths
    pathname.startsWith('/api/auth/') ||  // Authentication routes
    pathname.startsWith('/api/') ||  // API routes
    pathname.startsWith('/styles/') ||  // Stylesheets
    pathname.startsWith('/public/') ||  // Public assets
    pathname.includes('.')  // Static files like images, icons, etc.
  ) {
    return NextResponse.next();
  }

  // Redirect to sign-in if no token is found and not already on the sign-in page
  if (!token) {
    if (pathname !== '/auth/signin' && !pathname.startsWith('/auth/verify-request')) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  } else {
    // Additional log to confirm the presence of a valid token and role
    console.log(`User authenticated: Role - ${token?.role || 'None'}`);
  }

  // Role-based access control for the dashboard
  if (pathname.startsWith('/admin')) {
    const userRole = token?.role;

    if (userRole !== 'SuperAdmin' && userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
