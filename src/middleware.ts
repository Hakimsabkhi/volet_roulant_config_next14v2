import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that do not require authentication
  const publicPaths = [
    '/_next/',
    '/api/auth/',
    '/api/',
    '/styles/',
    '/public/',
    '/auth/signin',
    '/auth/signup',
    '/auth/verify-request',
    '/auth/error',
    '/favicon.ico'
  ];

  // Allow access to public paths or static files
  if (publicPaths.some(path => pathname.startsWith(path)) || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Attempt to retrieve token
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Log token presence and path for debugging
    console.log(`Token: ${token ? 'Found' : 'Not Found'}, Path: ${pathname}`);

    if (!token) {
      // Redirect to sign-in if no token and not accessing a public path
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Role-based access control for admin paths
    if (pathname.startsWith('/admin')) {
      const userRole = token.role;
      console.log(`User authenticated: Role - ${userRole || 'None'}`);

      if (userRole !== 'SuperAdmin' && userRole !== 'Admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

  } catch (error) {
    console.error('Error fetching token:', error);
    // Redirect to sign-in in case of error
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If all checks pass, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
