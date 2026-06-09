import type {Metadata} from "next";
import {FileCheck2, ScanText, ShieldCheck} from "lucide-react";

import {AppPageHeader} from "@/components/app-page-header";
import {UploadZone} from "@/components/upload-zone";

export const metadata: Metadata = {title: "Upload Medical Records"};

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AppPageHeader
        eyebrow="Document intake"
        title="Upload medical records"
        description="Add a text-based PDF and AI Health Vault will extract its contents, generate a structured summary, and make it available for questions."
      />
      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_280px]">
        <UploadZone />
        <aside className="space-y-4">
          {[
            {
              icon: FileCheck2,
              title: "Before uploading",
              copy: "Confirm the PDF opens correctly and contains selectable text.",
            },
            {
              icon: ScanText,
              title: "What happens next",
              copy: "Text is extracted, summarized, stored, and added to your searchable library.",
            },
            {
              icon: ShieldCheck,
              title: "Privacy reminder",
              copy: "This portfolio environment is for synthetic records only.",
            },
          ].map((item) => (
            <div key={item.title} className="panel p-5">
              <item.icon
                className="size-5 text-brand-700 dark:text-brand-300"
                aria-hidden="true"
              />
              <h2 className="mt-3 text-sm font-bold">{item.title}</h2>
              <p className="mt-1.5 text-xs leading-5 text-ink-600 dark:text-ink-300">
                {item.copy}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
