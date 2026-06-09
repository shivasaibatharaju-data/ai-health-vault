import type {Metadata} from "next";

import {AppPageHeader} from "@/components/app-page-header";
import {HealthTimeline} from "@/components/health-timeline";

export const metadata: Metadata = {title: "Health Timeline"};

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AppPageHeader
        eyebrow="Longitudinal view"
        title="Health timeline"
        description="Follow visits, laboratory results, specialist notes, medication updates, and other events across your record history."
      />
      <HealthTimeline />
    </div>
  );
}
