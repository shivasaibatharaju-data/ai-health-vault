import type {ApiRecord} from "@/lib/api";

export type MedicalRecord = ApiRecord & {
  type: string;
  provider: string;
  status: "Ready" | "Processing" | "Needs review";
  pages: number;
};

export type TimelineEvent = {
  id: number;
  date: string;
  title: string;
  provider: string;
  type: string;
  summary: string;
  accent: "brand" | "navy" | "amber" | "violet";
};

export const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    filename: "Annual_Physical_2025.pdf",
    created_at: "2025-11-18T10:30:00Z",
    type: "Visit summary",
    provider: "Northside Primary Care",
    status: "Ready",
    pages: 8,
    summary:
      "Annual wellness visit with stable vital signs. Preventive screenings were reviewed and routine laboratory work was ordered.",
  },
  {
    id: 2,
    filename: "Lab_Results_November.pdf",
    created_at: "2025-11-12T15:45:00Z",
    type: "Lab result",
    provider: "Metro Diagnostics",
    status: "Ready",
    pages: 3,
    summary:
      "Comprehensive metabolic and lipid panels. Results are organized by test, value, reference range, and collection date.",
  },
  {
    id: 3,
    filename: "Cardiology_Consult.pdf",
    created_at: "2025-09-04T09:15:00Z",
    type: "Specialist note",
    provider: "Heart & Vascular Group",
    status: "Needs review",
    pages: 12,
    summary:
      "Cardiology consultation covering reported symptoms, testing history, medication reconciliation, and follow-up recommendations.",
  },
  {
    id: 4,
    filename: "Medication_List.pdf",
    created_at: "2025-08-21T13:00:00Z",
    type: "Medication list",
    provider: "Patient portal export",
    status: "Ready",
    pages: 2,
    summary:
      "Current and historical medications with dose, frequency, prescribing provider, and status where available.",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2025-11-18",
    title: "Annual wellness visit",
    provider: "Northside Primary Care",
    type: "Visit summary",
    summary:
      "Preventive care reviewed, vital signs documented, and routine labs ordered.",
    accent: "brand",
  },
  {
    id: 2,
    date: "2025-11-12",
    title: "Laboratory panel completed",
    provider: "Metro Diagnostics",
    type: "Lab result",
    summary:
      "Metabolic and lipid results added to the vault with reference ranges.",
    accent: "navy",
  },
  {
    id: 3,
    date: "2025-09-04",
    title: "Cardiology consultation",
    provider: "Heart & Vascular Group",
    type: "Specialist note",
    summary:
      "Symptoms, prior testing, medications, and follow-up plan documented.",
    accent: "violet",
  },
  {
    id: 4,
    date: "2025-08-21",
    title: "Medication list reconciled",
    provider: "Patient portal export",
    type: "Medication list",
    summary: "Medication history consolidated from a patient portal export.",
    accent: "amber",
  },
];

export const recentQuestions = [
  {
    question: "What medications appear across my records?",
    answer: "4 medication references found",
    time: "Today, 9:42 AM",
  },
  {
    question: "When was my most recent lipid panel?",
    answer: "November 12, 2025",
    time: "Yesterday",
  },
  {
    question: "Summarize my latest specialist visit.",
    answer: "Cardiology consultation summarized",
    time: "Nov 20",
  },
];

export const starterQuestions = [
  "What medications are listed in my records?",
  "Summarize my most recent visit.",
  "Which lab results were outside the reference range?",
  "What follow-up actions were recommended?",
];
