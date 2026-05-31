export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureDbSeeded } = await import('@/lib/db/seed-on-start');
    await ensureDbSeeded();
  }
}
