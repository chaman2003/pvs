import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'pvs-promoters-dev-secret';
const COOKIE_NAME = 'pvs_admin_token';

export function signAdminToken(username: string): string {
  return jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): { role: string; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { role: string; username: string };
  } catch {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<{ role: string; username: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME, JWT_SECRET };
