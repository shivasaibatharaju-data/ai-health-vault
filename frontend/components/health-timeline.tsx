"use client";

import {CalendarDays, Filter, Search, Stethoscope} from "lucide-react";
import {useMemo, useState} from "react";

import {EmptyState} from "@/components/empty-state";
import {timelineEvents} from "@/lib/mock-data";
import {cn, formatDate} from "@/lib/utils";

const accentStyles = {
  brand: "bg-brand-500",
  navy: "bg-navy-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
};

export function HealthTimeline() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All events");

  const types = ["All events", ...new Set(timelineEvents.map((event) => event.type))];
  const filtered = useMemo(
    () =>
      timelineEvents.filter((event) => {
        const haystack =
          `${event.title} ${event.provider} ${event.summary}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (type === "All events" || event.type === type)
        );
      }),
    [query, type],
  );

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-4 sm:flex-row dark:border-white/10 dark:bg-ink-900">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search timeline events"
            className="min-h-11 w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 text-sm dark:border-white/15 dark:bg-ink-950"
            aria-label="Search timeline events"
          />
        </div>
        <div className="relative">
          <Filter
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="min-h-11 w-full appearance-none rounded-xl border border-ink-200 bg-white pl-10 pr-9 text-sm dark:border-white/15 dark:bg-ink-950 sm:w-52"
            aria-label="Filter timeline by event type"
          >
            {types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs leading-5 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
        Timeline events currently use synthetic demo data. A future backend
        endpoint will extract, normalize, and return events for each user.
      </div>

      <div className="panel mt-5 p-5 sm:p-8">
        {!filtered.length ? (
          <EmptyState
            icon={CalendarDays}
            title="No matching events"
            description="Try changing the search term or event type filter."
          />
        ) : (
          <div className="relative mx-auto max-w-4xl pl-8 sm:pl-12">
            <div className="absolute bottom-5 left-[13px] top-5 w-px bg-ink-200 sm:left-[21px] dark:bg-white/15" />
            <div className="space-y-7">
              {filtered.map((event) => (
                <article key={event.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[1.9rem] top-5 size-3.5 rounded-full border-[3px] border-white sm:-left-[2.35rem] dark:border-ink-900",
                      accentStyles[event.accent],
                    )}
                  />
                  <div className="rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 dark:border-white/10 dark:bg-ink-900">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
                          {formatDate(event.date)}
                        </p>
                        <h2 className="mt-2 text-lg font-bold">{event.title}</h2>
                      </div>
                      <span className="inline-flex w-fit rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700 dark:bg-ink-950 dark:text-ink-200">
                        {event.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                      {event.summary}
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink-500">
                      <Stethoscope className="size-3.5" aria-hidden="true" />
                      {event.provider}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
