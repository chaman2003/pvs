'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.question}
          className="border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest"
        >
          <button
            type="button"
            className="w-full px-6 py-4 text-left font-headline font-bold text-primary flex justify-between items-start gap-4"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span className="shrink-0 text-secondary">{openIndex === i ? '−' : '+'}</span>
          </button>
          <div
            className={cn(
              'px-6 overflow-hidden transition-all duration-300',
              openIndex === i ? 'pb-5' : 'max-h-0 pb-0'
            )}
          >
            <p className="text-on-surface-variant text-sm leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
