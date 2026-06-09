import type {Metadata} from "next";

import {LegalPage} from "@/components/legal-page";

export const metadata: Metadata = {title: "Terms of Service"};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 9, 2026"
      intro="These terms describe the intended conditions for using the AI Health Vault portfolio application. They are sample product terms and are not a substitute for legal review."
      sections={[
        {
          title: "Service purpose",
          content: (
            <p>
              AI Health Vault is a document organization and information
              retrieval tool. It is not a healthcare provider, medical device,
              emergency service, or substitute for professional medical advice.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          content: (
            <p>
              Users must have the right to upload any document they submit and
              must not use the service to violate privacy, intellectual
              property, security, or applicable law. Use synthetic data in the
              public demonstration.
            </p>
          ),
        },
        {
          title: "AI limitations",
          content: (
            <p>
              Generated summaries and answers may be incomplete or inaccurate.
              Users should verify information against original records and
              consult qualified healthcare professionals for clinical decisions.
            </p>
          ),
        },
        {
          title: "Availability and changes",
          content: (
            <p>
              Portfolio functionality may change, be interrupted, or be removed
              without notice. Pricing, plans, and account features shown in the
              interface are demonstrations until supporting services are built.
            </p>
          ),
        },
        {
          title: "Liability",
          content: (
            <p>
              The software is provided as-is without warranties. Production
              terms, liability limitations, dispute provisions, and compliance
              commitments require review by qualified legal counsel.
            </p>
          ),
        },
      ]}
    />
  );
}
