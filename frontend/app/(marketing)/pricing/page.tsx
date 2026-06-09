import type {Metadata} from "next";
import {CheckCircle2, ShieldCheck} from "lucide-react";

import {PageHero} from "@/components/page-hero";
import {PricingCards} from "@/components/pricing-cards";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple plans for organizing and understanding medical records.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Simple pricing"
        title="A clearer health history should be accessible."
        description="Start with the essentials for free, then upgrade when you need unlimited records, advanced AI, or family profiles."
      />
      <section className="section-space">
        <div className="container-shell">
          <PricingCards />
          <div className="mt-10 grid gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:grid-cols-3 dark:border-brand-900 dark:bg-brand-950/40">
            {[
              "14-day trial on paid plans",
              "No credit card for Essential",
              "Cancel or change plans anytime",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-100"
              >
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-shell">
          <div className="panel grid items-center gap-8 p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
                <ShieldCheck className="size-5" aria-hidden="true" />
                <span className="text-sm font-bold">Portfolio pricing preview</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold">
                Billing is not enabled in this public MVP.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">
                These plans demonstrate a production SaaS pricing model. Payment
                processing, subscriptions, usage metering, and entitlements are
                future backend work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
