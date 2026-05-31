import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const COOKIE_NAME = 'pvs_admin_token';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
