import type {Metadata} from "next";
import {LockKeyhole, ShieldCheck, Sparkles} from "lucide-react";
import Link from "next/link";

import {AuthForm} from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-ink-50 py-16 dark:bg-ink-950">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <span className="eyebrow">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Welcome back
          </span>
          <h1 className="mt-6 max-w-xl text-5xl font-bold tracking-tight">
            Your health history is ready when you are.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-ink-600 dark:text-ink-300">
            Return to your organized records, AI summaries, health timeline, and
            recent questions.
          </p>
          <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
            {[
              [ShieldCheck, "Privacy-minded workspace"],
              [LockKeyhole, "Protected health documents"],
            ].map(([Icon, copy]) => {
              const ItemIcon = Icon as typeof ShieldCheck;
              return (
                <div key={copy as string} className="panel flex items-center gap-3 p-4">
                  <ItemIcon
                    className="size-5 text-brand-700 dark:text-brand-300"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold">{copy as string}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel mx-auto w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Log in to AI Health Vault</h1>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            Continue to your private health workspace.
          </p>
          <div className="mt-7">
            <AuthForm mode="login" />
          </div>
          <p className="mt-6 text-center text-sm text-ink-600 dark:text-ink-300">
            New to AI Health Vault?{" "}
            <Link href="/signup" className="font-bold text-brand-700 dark:text-brand-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
