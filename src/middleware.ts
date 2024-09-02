import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow access to specific paths without authentication
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/styles/') || 
    pathname.startsWith('/public/') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect to sign-in if no token is found and not already on the sign-in page
  if (!token && pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
