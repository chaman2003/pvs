'use client';

import { useMemo, useState } from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { faqCategories, faqItems, type FaqCategoryId } from '@/content/faq';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId | 'all'>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return faqItems;
    return faqItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-bold transition-colors',
            activeCategory === 'all'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          )}
        >
          All
        </button>
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-bold transition-colors',
              activeCategory === cat.id
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <Accordion items={filtered} />
    </div>
  );
}
