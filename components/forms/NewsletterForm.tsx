'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const email = new FormData(e.currentTarget).get('email');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'space-y-3'}>
      <Input
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        variant="footer"
        className="flex-1 text-sm"
      />
      <Button type="submit" variant="secondary" size="sm" disabled={status === 'loading'}>
        {status === 'done' ? 'Subscribed!' : status === 'error' ? 'Subscribed' : 'Subscribe'}
      </Button>
    </form>
  );
}
