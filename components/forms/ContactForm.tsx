'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export function ContactForm({ subjectDefault = 'General Enquiry' }: { subjectDefault?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/inquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Failed to submit');
      setStatus('success');
      setMessage('Thank you! We will contact you shortly.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Input name="name" required placeholder="Your Name" />
        <Input name="email" type="email" required placeholder="Email Address" />
      </div>
      <Input name="phone" placeholder="Phone Number" />
      <input type="hidden" name="subject" value={subjectDefault} />
      <Textarea name="message" required rows={5} placeholder="Your Message" />
      <Button type="submit" disabled={status === 'loading'} className="w-full md:w-auto">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
      {message && (
        <p className={status === 'error' ? 'text-error' : 'text-primary font-medium'}>{message}</p>
      )}
    </form>
  );
}
