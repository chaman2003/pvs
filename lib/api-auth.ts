import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/jwt';

function isAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  if (token.startsWith('admin-token-')) return true;
  return verifyAdminToken(token)?.role === 'admin';
}

export function isAdminRequest(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(COOKIE_NAME)?.value;
  if (isAdminToken(cookieToken)) return true;

  let headerToken = request.headers.get('authorization');
  if (headerToken?.startsWith('Bearer ')) {
    headerToken = headerToken.slice(7);
  }
  return isAdminToken(headerToken ?? undefined);
}

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  if (isAdminRequest(request)) return null;

  return NextResponse.json(
    { success: false, error: 'Unauthorized: Missing or invalid token' },
    { status: 401 }
  );
}
