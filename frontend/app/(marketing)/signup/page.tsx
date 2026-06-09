import type {Metadata} from "next";
import {CheckCircle2, Sparkles} from "lucide-react";
import Link from "next/link";

import {AuthForm} from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-ink-50 py-16 dark:bg-ink-950">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <span className="eyebrow">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Start free
          </span>
          <h1 className="mt-6 max-w-xl text-5xl font-bold tracking-tight">
            Build a clearer picture of your health history.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-ink-600 dark:text-ink-300">
            Create a secure workspace for records, summaries, timeline events,
            and grounded answers.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Upload up to 10 records on the free plan",
              "Generate structured document summaries",
              "Explore a chronological health timeline",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold">
                <CheckCircle2
                  className="size-5 text-brand-600 dark:text-brand-300"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel mx-auto w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Create your free vault</h1>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            No credit card required.
          </p>
          <div className="mt-7">
            <AuthForm mode="signup" />
          </div>
          <p className="mt-6 text-center text-sm text-ink-600 dark:text-ink-300">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-brand-700 dark:text-brand-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
