import type {Metadata} from "next";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  FileSearch,
  FileText,
  ListFilter,
  LockKeyhole,
  ScanText,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";

import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {ButtonLink} from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore AI summaries, record-grounded chat, health timelines, document search, and private storage.",
};

const featureGroups = [
  {
    icon: ScanText,
    title: "Document intelligence",
    description:
      "Transform medical PDFs into organized information while keeping the original record connected to every insight.",
    items: [
      "Text extraction from medical PDFs",
      "Clinical detail identification",
      "Readable structured summaries",
      "Source record traceability",
    ],
  },
  {
    icon: Bot,
    title: "Record-grounded AI",
    description:
      "Ask natural-language questions and receive answers constrained to retrieved passages from your documents.",
    items: [
      "Relevant context retrieval",
      "Suggested starter questions",
      "Clear not-found behavior",
      "No diagnosis or medical advice",
    ],
  },
  {
    icon: Waypoints,
    title: "Longitudinal health view",
    description:
      "Bring events from multiple providers into one chronological view of visits, labs, and treatment changes.",
    items: [
      "Event dates and providers",
      "Document type labels",
      "Concise event summaries",
      "Filterable history",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product capabilities"
        title="A complete intelligence layer for your medical records."
        description="AI Health Vault combines document processing, grounded AI, and thoughtful organization in one focused healthcare workspace."
      >
        <ButtonLink href="/signup">Start organizing free</ButtonLink>
      </PageHero>

      <section className="section-space">
        <div className="container-shell space-y-20">
          {featureGroups.map((group, index) => (
            <div
              key={group.title}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div className={index % 2 ? "lg:order-2" : ""}>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  <group.icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight">
                  {group.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-ink-600 dark:text-ink-300">
                  {group.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm font-medium text-ink-700 dark:text-ink-200"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-brand-600 dark:text-brand-300"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`panel min-h-80 p-7 ${
                  index % 2 ? "lg:order-1" : ""
                }`}
              >
                {index === 0 && (
                  <div className="space-y-3">
                    {[
                      ["Medications", "4 references identified", Sparkles],
                      ["Lab results", "2 panels organized", FileSearch],
                      ["Follow-up", "3 actions extracted", FileText],
                    ].map(([label, value, Icon]) => {
                      const ItemIcon = Icon as typeof Sparkles;
                      return (
                        <div
                          key={label as string}
                          className="flex items-center gap-4 rounded-xl bg-ink-50 p-4 dark:bg-ink-950"
                        >
                          <span className="grid size-10 place-items-center rounded-xl bg-white text-brand-700 shadow-sm dark:bg-ink-900 dark:text-brand-300">
                            <ItemIcon className="size-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-bold">{label as string}</p>
                            <p className="text-xs text-ink-500">{value as string}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {index === 1 && (
                  <div>
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-600 p-4 text-sm text-white">
                      Summarize the follow-up plan from my last specialist visit.
                    </div>
                    <div className="mt-4 max-w-[92%] rounded-2xl rounded-bl-sm bg-ink-100 p-4 text-sm leading-6 text-ink-700 dark:bg-ink-950 dark:text-ink-200">
                      The note includes three follow-up items. I can organize
                      them by recommendation, timing, and source page.
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-300">
                        <BrainCircuit className="size-3.5" aria-hidden="true" />
                        Grounded in your specialist note
                      </div>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="relative pl-5">
                    <div className="absolute bottom-0 left-2 top-0 w-px bg-ink-200 dark:bg-white/15" />
                    {["Nov 18", "Nov 12", "Sep 04"].map((date, itemIndex) => (
                      <div
                        key={date}
                        className="relative mb-5 rounded-xl bg-ink-50 p-4 dark:bg-ink-950"
                      >
                        <span className="absolute -left-[1.45rem] top-5 size-3 rounded-full border-2 border-white bg-brand-500 dark:border-ink-900" />
                        <p className="text-xs font-bold text-brand-700 dark:text-brand-300">
                          {date}
                        </p>
                        <p className="mt-1 text-sm font-bold">
                          {["Wellness visit", "Lab panel", "Specialist consult"][
                            itemIndex
                          ]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-ink-50 dark:bg-ink-900/40">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Built for confidence"
            title="Thoughtful details across the whole experience."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ListFilter, "Search and filters", "Find records by name, type, date, or status."],
              [Cloud, "Cloud-ready", "Designed for Vercel, Render, Neon, and S3."],
              [LockKeyhole, "Private by design", "No public files or secrets in the repository."],
              [ShieldCheck, "Safety language", "Clear boundaries around AI and medical advice."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof ListFilter;
              return (
                <article key={title as string} className="panel p-6">
                  <ItemIcon
                    className="size-5 text-brand-700 dark:text-brand-300"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-bold">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                    {copy as string}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell rounded-[2rem] bg-ink-950 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            See your health records in a whole new way.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-300">
            Explore the complete demo or create your own synthetic-data workspace.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup">Create a free vault</ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">
              View dashboard demo
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
