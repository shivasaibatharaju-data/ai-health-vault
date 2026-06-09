import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  FileText,
  HeartPulse,
  Search,
} from "lucide-react";

export function HeroDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -left-10 top-1/3 hidden h-40 w-40 rounded-full bg-brand-300/30 blur-3xl sm:block" />
      <div className="absolute -right-10 bottom-8 h-48 w-48 rounded-full bg-navy-300/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-soft dark:border-white/10 dark:bg-ink-900">
        <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-ink-950/60 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                Good morning, Alex
              </p>
              <h2 className="mt-1 text-lg font-bold">Your health overview</h2>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
              <HeartPulse className="size-[18px]" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {label: "Records", value: "24", icon: FileText},
              {label: "Insights", value: "18", icon: Bot},
              {label: "Events", value: "41", icon: Activity},
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-ink-100 bg-white p-3 dark:border-white/10 dark:bg-ink-900"
              >
                <stat.icon
                  className="size-4 text-brand-600 dark:text-brand-300"
                  aria-hidden="true"
                />
                <p className="mt-3 text-xl font-bold sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] text-ink-500 dark:text-ink-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-xl border border-ink-100 bg-white p-4 dark:border-white/10 dark:bg-ink-900">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Recent records</p>
                <ArrowUpRight className="size-4 text-ink-400" aria-hidden="true" />
              </div>
              <div className="mt-3 space-y-3">
                {[
                  ["Annual Physical", "Visit summary", "Ready"],
                  ["Lab Results", "Diagnostics", "Ready"],
                  ["Cardiology Consult", "Specialist", "Review"],
                ].map(([name, type, status]) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      <FileText className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold">
                        {name}
                      </span>
                      <span className="block text-[10px] text-ink-500">
                        {type}
                      </span>
                    </span>
                    <span className="text-[10px] font-semibold text-brand-700 dark:text-brand-300">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-ink-950 p-4 text-white dark:bg-brand-950">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-brand-400/20 text-brand-300">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm font-bold">Ask your records</p>
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-ink-200">
                <Search className="mr-2 inline size-3.5" aria-hidden="true" />
                What changed since my last visit?
              </div>
              <div className="mt-3 rounded-lg bg-white/10 p-3">
                <p className="text-[11px] leading-5 text-ink-200">
                  I found 3 relevant updates across your recent records,
                  including a new lab panel and follow-up note.
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-brand-300">
                  <CheckCircle2 className="size-3" aria-hidden="true" />
                  Grounded in 3 sources
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
