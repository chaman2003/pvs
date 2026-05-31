import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/auth/admin';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAdminToken(username);
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 500 }
    );
  }
}
