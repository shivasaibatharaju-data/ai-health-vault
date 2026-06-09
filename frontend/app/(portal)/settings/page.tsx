import type {Metadata} from "next";

import {AppPageHeader} from "@/components/app-page-header";
import {SettingsPanel} from "@/components/settings-panel";

export const metadata: Metadata = {title: "Profile and Settings"};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AppPageHeader
        eyebrow="Your account"
        title="Profile and settings"
        description="Manage personal details, security preferences, notifications, and data controls."
      />
      <SettingsPanel />
    </div>
  );
}
