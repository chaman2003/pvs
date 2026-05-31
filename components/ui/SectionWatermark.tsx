export function SectionWatermark({ text }: { text: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none select-none absolute -top-4 left-0 text-6xl md:text-8xl font-headline font-bold text-primary/[0.04] uppercase tracking-wider whitespace-nowrap"
    >
      {text}
    </span>
  );
}
