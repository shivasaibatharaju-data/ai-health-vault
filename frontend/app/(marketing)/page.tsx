import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CloudUpload,
  FileHeart,
  FileSearch,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  MessagesSquare,
  ScanText,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";
import Link from "next/link";

import {HeroDashboardPreview} from "@/components/hero-dashboard-preview";
import {PricingCards} from "@/components/pricing-cards";
import {SectionHeading} from "@/components/section-heading";
import {ButtonLink} from "@/components/ui/button";

const problems = [
  "Records scattered across provider portals",
  "Long, technical PDFs that are hard to interpret",
  "No simple way to search across health history",
];

const features = [
  {
    icon: ScanText,
    title: "Intelligent extraction",
    copy: "Turn text-based medical PDFs into structured, searchable health information.",
  },
  {
    icon: Sparkles,
    title: "Clear AI summaries",
    copy: "Surface medications, conditions, labs, procedures, and follow-up actions.",
  },
  {
    icon: MessagesSquare,
    title: "Ask your records",
    copy: "Get answers grounded in retrieved passages from the documents you uploaded.",
  },
  {
    icon: Waypoints,
    title: "Health timeline",
    copy: "Organize visits, labs, procedures, and medication changes chronologically.",
  },
  {
    icon: FileSearch,
    title: "Unified library",
    copy: "Search and filter every medical record from one calm, organized workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-minded design",
    copy: "Built around private storage, controlled access, and data minimization.",
  },
];

const faq = [
  {
    question: "Is AI Health Vault medical advice?",
    answer:
      "No. AI Health Vault organizes and summarizes information already present in your records. It does not diagnose conditions or replace a qualified healthcare professional.",
  },
  {
    question: "What file types can I upload?",
    answer:
      "The current MVP accepts text-based PDF files up to 10 MB. OCR for scanned and handwritten documents is planned.",
  },
  {
    question: "How does the AI answer questions?",
    answer:
      "The app retrieves relevant passages from your uploaded records and asks the model to answer only from that context. When an answer is not present, it should say so.",
  },
  {
    question: "Is this production-ready for real patient data?",
    answer:
      "This public portfolio build is not HIPAA-certified and should use synthetic data. Production use requires authentication, tenant isolation, audit controls, legal review, and additional security work.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-grid bg-[size:40px_40px]">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white/95 to-white dark:from-brand-950/20 dark:via-ink-950/95 dark:to-ink-950" />
        <div className="container-shell relative grid items-center gap-14 py-20 lg:grid-cols-[.9fr_1.1fr] lg:py-28">
          <div>
            <span className="eyebrow">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Your health story, organized
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-[-0.045em] text-ink-950 sm:text-6xl lg:text-7xl dark:text-white">
              Your medical records,{" "}
              <span className="text-brand-600 dark:text-brand-400">
                finally understood.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-600 sm:text-xl dark:text-ink-300">
              Upload health documents, uncover clear AI summaries, and ask
              natural-language questions across your medical history.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="group">
                Start organizing free
                <ArrowRight
                  className="size-4 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary">
                Explore the demo
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600 dark:text-ink-300">
              {["No credit card", "Synthetic demo data", "Cancel anytime"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2
                      className="size-4 text-brand-600 dark:text-brand-300"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
          <HeroDashboardPreview />
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="The problem"
            title="Health data is available. Understanding it is still difficult."
            description="Patients receive more digital records than ever, yet the information remains fragmented, technical, and hard to use when it matters."
          />
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div
                key={problem}
                className="panel flex items-center gap-4 p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-red-50 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                  0{index + 1}
                </span>
                <p className="font-semibold text-ink-800 dark:text-ink-100">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-50 dark:bg-ink-900/40">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 rounded-[2rem] bg-ink-950 p-7 text-white lg:order-1">
            <div className="absolute right-6 top-6 size-24 rounded-full bg-brand-400/20 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                  <BrainCircuit className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-400">
                    AI summary
                  </p>
                  <h3 className="font-bold">Annual Physical 2025</h3>
                </div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["Clinical focus", "Preventive wellness"],
                  ["Medications", "4 references found"],
                  ["Lab panels", "2 panels organized"],
                  ["Follow-up", "Routine annual review"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/10 p-4">
                    <p className="text-xs text-ink-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-brand-400/20 bg-brand-400/10 p-4">
                <p className="text-xs font-semibold text-brand-200">
                  Suggested question
                </p>
                <p className="mt-1 text-sm">
                  “What follow-up actions were recommended?”
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="The solution"
              title="One intelligent workspace for your complete health history."
              description="AI Health Vault converts medical PDFs into organized knowledge: searchable records, readable summaries, grounded answers, and a chronological health timeline."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Upload records from any provider portal",
                "Find important details without reading every page",
                "Prepare focused questions before your next appointment",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-ink-700 dark:text-ink-200"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-brand-600 dark:text-brand-300"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Key features"
            title="Everything you need to make health records useful."
            description="Designed for clarity, confidence, and a much better experience than searching through folders and portals."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="panel group p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950 dark:text-brand-300">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-950 text-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How it works"
            title="From PDF to practical insight in three simple steps."
            description="The workflow keeps the technology in the background and your information in focus."
            align="center"
            inverse
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: CloudUpload,
                step: "01",
                title: "Upload securely",
                copy: "Add text-based medical PDFs from portals, providers, and labs.",
              },
              {
                icon: FileHeart,
                step: "02",
                title: "AI organizes",
                copy: "Extract clinical text, generate summaries, and structure key events.",
              },
              {
                icon: Bot,
                step: "03",
                title: "Explore and ask",
                copy: "Search your library, review your timeline, and ask grounded questions.",
              },
            ].map((item) => (
              <article key={item.step} className="relative text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-400/15 text-brand-300">
                  <item.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-xs font-bold tracking-[0.18em] text-brand-300">
                  STEP {item.step}
                </span>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-300">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <SectionHeading
            eyebrow="AI capabilities"
            title="Ask better questions of the records you already have."
            description="Retrieval-grounded AI narrows the context to relevant document passages before generating an answer."
          />
          <div className="panel p-5 sm:p-7">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-100 dark:bg-white/10">
                <span className="text-xs font-bold">You</span>
              </span>
              <div className="rounded-2xl rounded-tl-sm bg-ink-100 px-4 py-3 text-sm dark:bg-white/10">
                What changed between my last two lab reports?
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white dark:bg-brand-400 dark:text-ink-950">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              <div className="rounded-2xl rounded-tl-sm border border-brand-100 bg-brand-50 px-4 py-4 text-sm leading-6 text-ink-700 dark:border-brand-900 dark:bg-brand-950/60 dark:text-ink-100">
                I found two lab reports. The newer report includes updated lipid
                and metabolic panels. I can organize the differences by test,
                value, date, and reference range.
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300">
                  <FileSearch className="size-3.5" aria-hidden="true" />
                  2 record sources retrieved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="security"
        className="section-space bg-brand-50 dark:bg-brand-950/30"
      >
        <div className="container-shell">
          <SectionHeading
            eyebrow="Security and privacy"
            title="Health data deserves thoughtful protection."
            description="The production architecture is designed around private storage, least-privilege access, encryption, and clear user control."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: LockKeyhole,
                title: "Encrypted storage",
                copy: "Private object storage with server-side encryption and protected database connections.",
              },
              {
                icon: Fingerprint,
                title: "Controlled access",
                copy: "Authentication and user-level data isolation are part of the production roadmap.",
              },
              {
                icon: KeyRound,
                title: "You stay in control",
                copy: "Planned retention, export, and deletion controls keep ownership with the user.",
              },
            ].map((item) => (
              <article key={item.title} className="panel p-6">
                <item.icon
                  className="size-6 text-brand-700 dark:text-brand-300"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-ink-500 dark:text-ink-400">
            This public portfolio demonstration is not HIPAA-certified and
            should not be used with real protected health information.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Simple pricing"
            title="Start free. Upgrade when your health history grows."
            description="Transparent plans designed for individuals and families."
            align="center"
          />
          <div className="mt-12">
            <PricingCards compact />
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-50 dark:bg-ink-900/40">
        <div className="container-shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered clearly."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white px-6 dark:divide-white/10 dark:border-white/10 dark:bg-ink-900">
            {faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-bold marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-14 text-center text-white sm:px-12">
          <span className="eyebrow border-white/10 bg-white/5 text-brand-200">
            Your records. Your questions. One place.
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Make your medical history easier to understand today.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-ink-300">
            Experience a calmer, more useful way to organize and explore your
            health documents.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup">Create your free vault</ButtonLink>
            <Link
              href="/features"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore all features
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
