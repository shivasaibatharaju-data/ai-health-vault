import type {ReactNode} from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-hero-grid bg-[size:40px_40px] dark:border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-white/95 to-white dark:from-brand-950/25 dark:via-ink-950/95 dark:to-ink-950" />
      <div className="container-shell relative py-20 text-center sm:py-24">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-600 dark:text-ink-300">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
