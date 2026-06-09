import {Check} from "lucide-react";

import {ButtonLink} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const plans = [
  {
    name: "Essential",
    price: "$0",
    description: "A simple place to start organizing your health documents.",
    features: [
      "Up to 10 medical records",
      "PDF text extraction",
      "Basic document summaries",
      "Health timeline preview",
    ],
  },
  {
    name: "Plus",
    price: "$12",
    description: "For people actively managing records across providers.",
    features: [
      "Unlimited medical records",
      "Advanced AI summaries",
      "Record-grounded AI chat",
      "Complete health timeline",
      "Priority processing",
    ],
    featured: true,
  },
  {
    name: "Family",
    price: "$24",
    description: "One secure workspace for a household's health records.",
    features: [
      "Everything in Plus",
      "Up to 5 family profiles",
      "Shared caregiver access",
      "Exportable health brief",
      "Priority support",
    ],
  },
];

export function PricingCards({compact = false}: {compact?: boolean}) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={cn(
            "panel relative flex flex-col p-7",
            plan.featured &&
              "border-brand-500 ring-1 ring-brand-500 dark:border-brand-400 dark:ring-brand-400",
          )}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white dark:bg-brand-400 dark:text-ink-950">
              Most popular
            </span>
          )}
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink-600 dark:text-ink-300">
            {plan.description}
          </p>
          <div className="mt-6 flex items-end gap-1">
            <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
            <span className="pb-1 text-sm text-ink-500">
              {plan.price !== "$0" ? "/month" : "forever"}
            </span>
          </div>
          <ul className={cn("mt-6 space-y-3", compact && "hidden sm:block")}>
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2.5 text-sm text-ink-700 dark:text-ink-200"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-brand-600 dark:text-brand-300"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
          <ButtonLink
            href="/signup"
            variant={plan.featured ? "primary" : "secondary"}
            className="mt-7 w-full"
          >
            {plan.price === "$0" ? "Get started free" : "Start 14-day trial"}
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
