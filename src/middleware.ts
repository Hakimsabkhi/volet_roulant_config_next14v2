// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPath = req.nextUrl.pathname.startsWith('/auth');

  // Allow requests for static files, API routes, and Next.js internal requests to pass through
  if (
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/styles/') ||
    req.nextUrl.pathname.startsWith('/public/') ||
    req.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If there is no token and the request is not for an authentication path, redirect to sign-in
  if (!token && !isAuthPath) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If there is a token and the request is for an authentication path, redirect to home
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};