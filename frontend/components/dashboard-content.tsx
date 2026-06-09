"use client";

import {
  ArrowRight,
  Bot,
  CalendarDays,
  FileHeart,
  FileText,
  MessageCircleQuestion,
  Plus,
  Sparkles,
  UploadCloud,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";

import {EmptyState} from "@/components/empty-state";
import {StatusPill} from "@/components/status-pill";
import {ButtonLink} from "@/components/ui/button";
import {api, type ApiRecord} from "@/lib/api";
import {
  mockRecords,
  recentQuestions,
  timelineEvents,
  type MedicalRecord,
} from "@/lib/mock-data";
import {formatDate} from "@/lib/utils";

function asMedicalRecord(record: ApiRecord): MedicalRecord {
  return {
    ...record,
    type: "Medical record",
    provider: "Uploaded document",
    status: "Ready",
    pages: 0,
  };
}

export function DashboardContent() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    api
      .getRecords()
      .then((items) => {
        setRecords(items.map(asMedicalRecord));
        setUsingDemo(false);
      })
      .catch(() => {
        setRecords(mockRecords);
        setUsingDemo(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({length: 8}).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-ink-200/70 dark:bg-ink-800"
          />
        ))}
      </div>
    );
  }

  const hasRecords = records.length > 0;
  const stats = [
    {
      label: "Medical records",
      value: records.length.toString(),
      detail: hasRecords ? "Available in your vault" : "Upload your first record",
      icon: FileText,
    },
    {
      label: "AI summaries",
      value: records.filter((record) => record.summary).length.toString(),
      detail: "Generated from record text",
      icon: Sparkles,
    },
    {
      label: "Timeline events",
      value: hasRecords ? timelineEvents.length.toString() : "0",
      detail: "Across visits and reports",
      icon: Waypoints,
    },
    {
      label: "Questions asked",
      value: hasRecords ? recentQuestions.length.toString() : "0",
      detail: "Grounded in your records",
      icon: MessageCircleQuestion,
    },
  ];

  return (
    <>
      {usingDemo && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
          <p>
            <strong>Demo workspace:</strong> The API is offline, so polished
            synthetic records are shown.
          </p>
          <span className="text-xs font-semibold">No real health data</span>
        </div>
      )}

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                <stat.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold text-ink-400">All time</span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold">{stat.label}</p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
              {stat.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.85fr]">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
            <div>
              <h2 className="font-bold">Recent medical records</h2>
              <p className="mt-0.5 text-xs text-ink-500">
                Your latest uploaded and processed documents
              </p>
            </div>
            <Link
              href="/records"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 dark:text-brand-300"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          {!hasRecords ? (
            <EmptyState
              icon={FileHeart}
              title="Your vault is ready"
              description="Upload a text-based medical PDF to create your first summary and start building your timeline."
              action={
                <ButtonLink href="/upload">
                  <UploadCloud className="size-4" aria-hidden="true" />
                  Upload first record
                </ButtonLink>
              }
            />
          ) : (
            <div className="divide-y divide-ink-100 dark:divide-white/10">
              {records.slice(0, 4).map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-600 dark:bg-ink-950 dark:text-ink-300">
                    <FileText className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{record.filename}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {record.type} · {formatDate(record.created_at)}
                    </p>
                  </div>
                  <StatusPill status={record.status} />
                  <Link
                    href="/records"
                    className="text-xs font-bold text-brand-700 dark:text-brand-300"
                  >
                    View summary
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl bg-ink-950 text-white shadow-card dark:bg-brand-950">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  AI insight
                </p>
                <h2 className="font-bold">Your records at a glance</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-ink-200">
              {hasRecords
                ? "Your vault includes recent wellness, laboratory, and specialist documents. Ask the assistant to compare dates, summarize visits, or find follow-up actions."
                : "Once you upload a record, AI Health Vault can organize key details and answer questions using retrieved document context."}
            </p>
            <ButtonLink
              href={hasRecords ? "/chat" : "/upload"}
              className="mt-6 w-full"
            >
              {hasRecords ? "Ask the AI assistant" : "Upload a record"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="border-t border-white/10 bg-white/5 px-6 py-4 text-xs text-ink-300">
            AI answers are informational and not medical advice.
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
            <div>
              <h2 className="font-bold">Recent questions</h2>
              <p className="mt-0.5 text-xs text-ink-500">
                Conversations with your record assistant
              </p>
            </div>
            <Link
              href="/chat"
              className="text-xs font-bold text-brand-700 dark:text-brand-300"
            >
              Open chat
            </Link>
          </div>
          {hasRecords ? (
            <div className="divide-y divide-ink-100 dark:divide-white/10">
              {recentQuestions.map((item) => (
                <div key={item.question} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      <MessageCircleQuestion
                        className="size-4"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.question}</p>
                      <p className="mt-1 text-xs text-ink-500">{item.answer}</p>
                    </div>
                    <time className="hidden text-[11px] text-ink-400 sm:block">
                      {item.time}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={MessageCircleQuestion}
              title="No questions yet"
              description="Questions and answers will appear here after your first record is processed."
            />
          )}
        </div>

        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
            <div>
              <h2 className="font-bold">Health timeline</h2>
              <p className="mt-0.5 text-xs text-ink-500">
                Recent events extracted from your records
              </p>
            </div>
            <Link
              href="/timeline"
              className="text-xs font-bold text-brand-700 dark:text-brand-300"
            >
              Full timeline
            </Link>
          </div>
          {hasRecords ? (
            <div className="p-5">
              <div className="relative space-y-5 pl-6">
                <div className="absolute bottom-2 left-2 top-2 w-px bg-ink-200 dark:bg-white/15" />
                {timelineEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="relative">
                    <span className="absolute -left-[1.25rem] top-1.5 size-3 rounded-full border-2 border-white bg-brand-500 dark:border-ink-900" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold">{event.title}</p>
                        <p className="mt-1 text-xs text-ink-500">
                          {event.provider} · {event.type}
                        </p>
                      </div>
                      <time className="text-[11px] font-semibold text-ink-500">
                        {formatDate(event.date)}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="Timeline waiting for records"
              description="Extracted visits, labs, and other events will be organized here."
            />
          )}
        </div>
      </section>
    </>
  );
}
