import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { getAdminFromCookie } from '@/lib/auth/jwt';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await getAdminFromCookie();
  return <AdminDashboard initialAuthenticated={!!admin} />;
}
