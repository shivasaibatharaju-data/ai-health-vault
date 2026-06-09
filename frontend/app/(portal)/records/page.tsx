import type {Metadata} from "next";
import {UploadCloud} from "lucide-react";

import {AppPageHeader} from "@/components/app-page-header";
import {RecordsLibrary} from "@/components/records-library";
import {ButtonLink} from "@/components/ui/button";

export const metadata: Metadata = {title: "Medical Records Library"};

export default function RecordsPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <AppPageHeader
        eyebrow="Document library"
        title="Medical records"
        description="Search, filter, and review every document and AI-generated summary in your vault."
        actions={
          <ButtonLink href="/upload">
            <UploadCloud className="size-4" aria-hidden="true" />
            Upload record
          </ButtonLink>
        }
      />
      <RecordsLibrary />
    </div>
  );
}
