import type {Metadata} from "next";

import {AppPageHeader} from "@/components/app-page-header";
import {ChatAssistant} from "@/components/chat-assistant";

export const metadata: Metadata = {title: "AI Chat Assistant"};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <AppPageHeader
        eyebrow="Record-grounded AI"
        title="AI health assistant"
        description="Ask questions across your uploaded medical records and receive answers grounded in retrieved document context."
      />
      <ChatAssistant />
    </div>
  );
}
