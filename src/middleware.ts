import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Log token and path for debugging
  console.log(`Token: ${token ? 'Found' : 'Not Found'}, Path: ${pathname}`);

  // Allow paths that don't require authentication
  if (
    pathname.startsWith('/_next/') || // Next.js internal paths
    pathname.startsWith('/api/') || // API routes
    pathname.startsWith('/styles/') || // Stylesheets
    pathname.startsWith('/public/') || // Public assets
    pathname.includes('.') // Static files like images, icons, etc.
  ) {
    return NextResponse.next();
  }

  // If no token is found, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Role-based access control for the dashboard
  if (pathname.startsWith('/admin')) {
    const userRole = token.role;

    if (userRole !== 'SuperAdmin' && userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
