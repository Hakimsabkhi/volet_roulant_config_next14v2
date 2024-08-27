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

  // Handle valid auth paths and existing pages
  const validAuthPaths = ['/auth/signin', '/auth/signup', '/auth/reset-password']; // List valid auth paths
  const isAuthPath = pathname.startsWith('/auth');

  if (!validAuthPaths.includes(pathname) && isAuthPath) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to homepage if path is invalid
  }

  // Redirect unauthenticated users to sign-in page
  if (!token && !isAuthPath) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url); // Ensure return after sign-in
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (token && isAuthPath && validAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to all routes
};
