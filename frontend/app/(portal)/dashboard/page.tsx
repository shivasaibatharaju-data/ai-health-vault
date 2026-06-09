import type {Metadata} from "next";
import {Plus} from "lucide-react";

import {AppPageHeader} from "@/components/app-page-header";
import {DashboardContent} from "@/components/dashboard-content";
import {ButtonLink} from "@/components/ui/button";

export const metadata: Metadata = {title: "Dashboard"};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <AppPageHeader
        eyebrow="Tuesday, June 9"
        title="Good afternoon, Alex"
        description="Here is the latest view of your medical records and AI-generated health insights."
        actions={
          <ButtonLink href="/upload">
            <Plus className="size-4" aria-hidden="true" />
            Add record
          </ButtonLink>
        }
      />
      <DashboardContent />
    </div>
  );
}
