"use client";

import {
  FileText,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {useEffect, useMemo, useState} from "react";

import {EmptyState} from "@/components/empty-state";
import {StatusPill} from "@/components/status-pill";
import {Button, ButtonLink} from "@/components/ui/button";
import {api, type ApiRecord} from "@/lib/api";
import {mockRecords, type MedicalRecord} from "@/lib/mock-data";
import {cn, formatDate} from "@/lib/utils";

function enhance(record: ApiRecord): MedicalRecord {
  return {
    ...record,
    type: "Medical record",
    provider: "Uploaded document",
    status: "Ready",
    pages: 0,
  };
}

export function RecordsLibrary() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All types");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<MedicalRecord | null>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    api
      .getRecords()
      .then((items) => {
        setRecords(items.map(enhance));
        setDemo(false);
      })
      .catch(() => {
        setRecords(mockRecords);
        setDemo(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const types = ["All types", ...new Set(records.map((record) => record.type))];
  const filtered = useMemo(
    () =>
      records.filter((record) => {
        const searchTarget =
          `${record.filename} ${record.provider} ${record.type}`.toLowerCase();
        return (
          searchTarget.includes(query.toLowerCase()) &&
          (type === "All types" || record.type === type)
        );
      }),
    [query, records, type],
  );

  if (loading) {
    return (
      <div className="mt-7 h-96 animate-pulse rounded-2xl bg-ink-200/70 dark:bg-ink-800" />
    );
  }

  return (
    <>
      {demo && (
        <p className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
          Demo records are shown because the FastAPI service is unavailable.
        </p>
      )}
      <div className="panel mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-100 p-4 sm:flex-row sm:items-center dark:border-white/10">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records, providers, or document types"
              className="min-h-11 w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 text-sm dark:border-white/15 dark:bg-ink-950"
              aria-label="Search medical records"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:flex-none">
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400"
                aria-hidden="true"
              />
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="min-h-11 w-full appearance-none rounded-xl border border-ink-200 bg-white pl-9 pr-8 text-sm dark:border-white/15 dark:bg-ink-950 sm:w-44"
                aria-label="Filter records by type"
              >
                {types.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="hidden rounded-xl border border-ink-200 p-1 dark:border-white/15 sm:flex">
              {[
                {value: "table", icon: List, label: "Table view"},
                {value: "grid", icon: LayoutGrid, label: "Grid view"},
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setView(item.value as "table" | "grid")}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg",
                    view === item.value &&
                      "bg-ink-100 text-brand-700 dark:bg-white/10 dark:text-brand-300",
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {!records.length ? (
          <EmptyState
            icon={FileText}
            title="No medical records yet"
            description="Upload your first PDF to begin building a searchable health library."
            action={<ButtonLink href="/upload">Upload first record</ButtonLink>}
          />
        ) : !filtered.length ? (
          <EmptyState
            icon={Search}
            title="No matching records"
            description="Try a different search term or remove the document type filter."
            action={
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setType("All types");
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : view === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.08em] text-ink-500 dark:bg-ink-950">
                <tr>
                  <th className="px-5 py-3 font-bold">Document</th>
                  <th className="px-5 py-3 font-bold">Uploaded</th>
                  <th className="px-5 py-3 font-bold">Type</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 dark:divide-white/10">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                          <FileText className="size-[18px]" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="max-w-xs truncate text-sm font-bold">
                            {record.filename}
                          </p>
                          <p className="mt-0.5 text-xs text-ink-500">
                            {record.provider}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-600 dark:text-ink-300">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-600 dark:text-ink-300">
                      {record.type}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={record.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(record)}
                        className="text-sm font-bold text-brand-700 hover:underline dark:text-brand-300"
                      >
                        View summary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((record) => (
              <article
                key={record.id}
                className="rounded-2xl border border-ink-200 p-5 dark:border-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    <FileText className="size-[18px]" aria-hidden="true" />
                  </span>
                  <StatusPill status={record.status} />
                </div>
                <h2 className="mt-4 truncate font-bold">{record.filename}</h2>
                <p className="mt-1 text-xs text-ink-500">{record.provider}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-ink-500">
                  <span>{record.type}</span>
                  <span>{formatDate(record.created_at)}</span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-5 w-full"
                  onClick={() => setSelected(record)}
                >
                  View summary
                </Button>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/60"
            onClick={() => setSelected(null)}
            aria-label="Close summary"
          />
          <article className="panel relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg hover:bg-ink-100 dark:hover:bg-white/10"
              aria-label="Close summary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <span className="eyebrow">AI summary</span>
            <h2 className="mt-5 pr-10 text-2xl font-bold">{selected.filename}</h2>
            <p className="mt-2 text-sm text-ink-500">
              {selected.provider} · {selected.type} ·{" "}
              {formatDate(selected.created_at)}
            </p>
            <div className="mt-6 whitespace-pre-wrap rounded-2xl bg-ink-50 p-5 text-sm leading-7 text-ink-700 dark:bg-ink-950 dark:text-ink-200">
              {selected.summary || "A summary has not been generated for this record."}
            </div>
            <p className="mt-4 text-xs leading-5 text-ink-500">
              Verify important details against the original record. This summary
              is informational and not medical advice.
            </p>
          </article>
        </div>
      )}
    </>
  );
}
