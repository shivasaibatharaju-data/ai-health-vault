"use client";

import {ArrowRight, CheckCircle2, Eye, EyeOff, Loader2} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";

import {Button} from "@/components/ui/button";

export function AuthForm({mode}: {mode: "login" | "signup"}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // TODO: Replace this demo transition with the production authentication API.
    window.setTimeout(() => router.push("/dashboard"), 700);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-ink-800 dark:text-ink-100"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Alex Morgan"
            className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-ink-800 dark:text-ink-100"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="alex@example.com"
          className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
        />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-ink-800 dark:text-ink-100"
          >
            Password
          </label>
          {mode === "login" && (
            <button
              type="button"
              className="text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={8}
            required
            placeholder="At least 8 characters"
            className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 pr-12 text-sm dark:border-white/15 dark:bg-ink-950"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {mode === "signup" && (
        <>
          <div className="space-y-2 rounded-xl bg-ink-50 p-4 text-xs text-ink-600 dark:bg-ink-950 dark:text-ink-300">
            {[
              "Use 8 or more characters",
              "Keep your vault password unique",
            ].map((item) => (
              <p key={item} className="flex items-center gap-2">
                <CheckCircle2
                  className="size-3.5 text-brand-600 dark:text-brand-300"
                  aria-hidden="true"
                />
                {item}
              </p>
            ))}
          </div>
          <label className="flex gap-3 text-xs leading-5 text-ink-600 dark:text-ink-300">
            <input
              type="checkbox"
              required
              className="mt-1 size-4 rounded border-ink-300 accent-brand-600"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-brand-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-brand-700">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            {mode === "login" ? "Log in to your vault" : "Create your free vault"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        Demo mode: authentication is not yet connected. Submitting opens the
        synthetic-data dashboard.
      </p>
    </form>
  );
}
