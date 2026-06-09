import type {ReactNode} from "react";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Array<{title: string; content: ReactNode}>;
}) {
  return (
    <section className="section-space">
      <div className="container-shell grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-sm text-ink-500">Last updated {updated}</p>
        </aside>
        <article className="max-w-3xl">
          <p className="text-lg leading-8 text-ink-600 dark:text-ink-300">
            {intro}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-ink-600 dark:text-ink-300">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
