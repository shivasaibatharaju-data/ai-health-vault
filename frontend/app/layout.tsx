import type {Metadata} from "next";
import {Manrope, Source_Sans_3} from "next/font/google";
import type {ReactNode} from "react";

import {ThemeProvider} from "@/components/theme-provider";

import "./globals.css";

const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Health Vault | Your health records, finally understood",
    template: "%s | AI Health Vault",
  },
  description:
    "Upload, organize, summarize, and ask questions about your medical records with a secure AI-powered health document workspace.",
  metadataBase: new URL("https://ai-health-vault.vercel.app"),
  openGraph: {
    title: "AI Health Vault",
    description:
      "A secure, intelligent home for understanding your medical records.",
    type: "website",
  },
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
