import type {Metadata} from "next";

import {LegalPage} from "@/components/legal-page";

export const metadata: Metadata = {title: "Privacy Policy"};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 9, 2026"
      intro="This policy describes the intended data practices for the AI Health Vault portfolio application. The public demonstration should only be used with synthetic or non-sensitive documents."
      sections={[
        {
          title: "Information processed",
          content: (
            <p>
              The application may process account details, uploaded PDF files,
              extracted document text, generated summaries, and questions
              submitted to the AI assistant. Production analytics should avoid
              collecting document contents or sensitive health information.
            </p>
          ),
        },
        {
          title: "How information is used",
          content: (
            <p>
              Information is used to organize records, generate summaries,
              retrieve relevant passages, answer questions, and operate the
              user workspace. It should not be sold or used for advertising.
            </p>
          ),
        },
        {
          title: "Storage and security",
          content: (
            <p>
              The target architecture uses private object storage, encrypted
              connections, least-privilege credentials, and user-level access
              controls. This public MVP does not yet include every control
              required for protected health information.
            </p>
          ),
        },
        {
          title: "AI processing",
          content: (
            <p>
              When configured, selected document text may be sent to an AI model
              provider to generate summaries and answers. A production service
              must document provider retention, contractual protections, and
              regional processing requirements.
            </p>
          ),
        },
        {
          title: "Your choices",
          content: (
            <p>
              Production users should be able to access, export, correct, and
              delete their information. These account-level workflows remain on
              the backend roadmap for this portfolio build.
            </p>
          ),
        },
      ]}
    />
  );
}
