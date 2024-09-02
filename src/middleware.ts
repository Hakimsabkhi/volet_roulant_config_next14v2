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



  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
