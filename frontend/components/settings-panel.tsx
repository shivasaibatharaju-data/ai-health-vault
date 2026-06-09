"use client";

import {
  Bell,
  CheckCircle2,
  Database,
  KeyRound,
  Loader2,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import {FormEvent, useState} from "react";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const tabs = [
  {id: "profile", label: "Profile", icon: UserRound},
  {id: "security", label: "Security", icon: KeyRound},
  {id: "notifications", label: "Notifications", icon: Bell},
  {id: "data", label: "Data and privacy", icon: Database},
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 rounded-full transition",
        checked ? "bg-brand-600" : "bg-ink-300 dark:bg-ink-700",
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-4 rounded-full bg-white transition-all",
          checked ? "left-6" : "left-1",
        )}
      />
    </button>
  );
}

export function SettingsPanel() {
  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emails, setEmails] = useState(true);
  const [processing, setProcessing] = useState(true);
  const [weekly, setWeekly] = useState(false);

  const save = (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    // TODO: Persist profile and preference changes through authenticated APIs.
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 650);
  };

  return (
    <div className="panel mt-7 grid overflow-hidden lg:grid-cols-[250px_1fr]">
      <nav
        className="flex gap-2 overflow-x-auto border-b border-ink-100 bg-ink-50 p-3 dark:border-white/10 dark:bg-ink-950/60 lg:block lg:border-b-0 lg:border-r lg:p-4"
        aria-label="Settings"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTab(item.id);
              setSaved(false);
            }}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition lg:mb-1 lg:w-full",
              tab === item.id
                ? "bg-white text-brand-800 shadow-sm dark:bg-ink-900 dark:text-brand-200"
                : "text-ink-600 hover:bg-white/70 dark:text-ink-300 dark:hover:bg-white/5",
            )}
          >
            <item.icon className="size-[18px]" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </nav>
      <form onSubmit={save} className="p-5 sm:p-8">
        {tab === "profile" && (
          <div>
            <h2 className="text-xl font-bold">Profile information</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Update the personal details shown in your health workspace.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-2xl bg-brand-100 text-lg font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                AS
              </span>
              <div>
                <Button type="button" variant="secondary">
                  Change photo
                </Button>
                <p className="mt-1.5 text-xs text-ink-500">JPG or PNG, up to 2 MB</p>
              </div>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="mb-1.5 block text-sm font-semibold">
                  First name
                </label>
                <input
                  id="first-name"
                  defaultValue="Alex"
                  className="min-h-11 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="mb-1.5 block text-sm font-semibold">
                  Last name
                </label>
                <input
                  id="last-name"
                  defaultValue="Smith"
                  className="min-h-11 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="settings-email" className="mb-1.5 block text-sm font-semibold">
                  Email address
                </label>
                <input
                  id="settings-email"
                  type="email"
                  defaultValue="alex@example.com"
                  className="min-h-11 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
                />
              </div>
            </div>
          </div>
        )}

        {tab === "security" && (
          <div>
            <h2 className="text-xl font-bold">Security</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Manage account protection and active sessions.
            </p>
            <div className="mt-7 space-y-4">
              <div className="flex flex-col gap-4 rounded-2xl border border-ink-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div className="flex gap-3">
                  <LockKeyhole className="mt-1 size-5 text-brand-700 dark:text-brand-300" />
                  <div>
                    <h3 className="font-bold">Password</h3>
                    <p className="mt-1 text-sm text-ink-500">
                      Last updated 3 months ago
                    </p>
                  </div>
                </div>
                <Button type="button" variant="secondary">
                  Change password
                </Button>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-ink-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div>
                  <h3 className="font-bold">Two-factor authentication</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Add an extra layer of account security.
                  </p>
                </div>
                <Button type="button">Enable 2FA</Button>
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Choose which updates you receive.
            </p>
            <div className="mt-7 divide-y divide-ink-100 rounded-2xl border border-ink-200 px-5 dark:divide-white/10 dark:border-white/10">
              {[
                {
                  label: "Product and account emails",
                  copy: "Important account notices and feature updates.",
                  value: emails,
                  set: () => setEmails((item) => !item),
                },
                {
                  label: "Document processing updates",
                  copy: "Know when summaries and timeline events are ready.",
                  value: processing,
                  set: () => setProcessing((item) => !item),
                },
                {
                  label: "Weekly health vault digest",
                  copy: "A weekly summary of activity in your workspace.",
                  value: weekly,
                  set: () => setWeekly((item) => !item),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-5 py-5"
                >
                  <div>
                    <h3 className="text-sm font-bold">{item.label}</h3>
                    <p className="mt-1 text-xs text-ink-500">{item.copy}</p>
                  </div>
                  <Toggle
                    checked={item.value}
                    onChange={item.set}
                    label={item.label}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "data" && (
          <div>
            <h2 className="text-xl font-bold">Data and privacy</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Review data controls planned for the production service.
            </p>
            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-ink-200 p-5 dark:border-white/10">
                <h3 className="font-bold">Export your vault</h3>
                <p className="mt-1 text-sm text-ink-500">
                  Download an archive of records, summaries, and timeline events.
                </p>
                <Button type="button" variant="secondary" className="mt-4">
                  Request export
                </Button>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/20">
                <h3 className="font-bold text-red-800 dark:text-red-200">
                  Delete account and data
                </h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  Permanently remove the account, uploaded records, and generated
                  data.
                </p>
                <Button type="button" variant="danger" className="mt-4">
                  Delete account
                </Button>
              </div>
              <p className="text-xs leading-5 text-ink-500">
                TODO: Export, retention, and deletion require authenticated
                backend endpoints and storage cleanup workflows.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-3 border-t border-ink-100 pt-6 dark:border-white/10">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            Save changes
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Saved in demo mode
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
