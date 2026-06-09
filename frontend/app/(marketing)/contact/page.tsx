import type {Metadata} from "next";
import {Github, Mail, MessageSquareText} from "lucide-react";

import {ContactForm} from "@/components/contact-form";
import {PageHero} from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Questions, feedback, or collaboration ideas?"
        description="AI Health Vault is a portfolio project built at the intersection of healthcare, data engineering, and generative AI."
      />
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div className="space-y-4">
            {[
              {
                icon: MessageSquareText,
                title: "Product feedback",
                copy: "Share an idea about the experience, workflow, or AI capabilities.",
              },
              {
                icon: Github,
                title: "Technical discussion",
                copy: "Review the open-source architecture and implementation on GitHub.",
              },
              {
                icon: Mail,
                title: "Career and collaboration",
                copy: "Connect about data engineering, GenAI, and healthcare technology.",
              },
            ].map((item) => (
              <div key={item.title} className="panel flex gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="panel p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
