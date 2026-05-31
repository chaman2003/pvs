export function validateAdminCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || 'pvs-promoters';
  const adminPass = process.env.ADMIN_PASSWORD || 'pvs-promoters@2026';
  return username === adminUser && password === adminPass;
}
