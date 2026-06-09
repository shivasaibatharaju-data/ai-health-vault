import {Github, Linkedin, Mail} from "lucide-react";
import Link from "next/link";

import {BrandLogo} from "@/components/brand-logo";

const footerLinks = {
  Product: [
    {label: "Features", href: "/features"},
    {label: "Pricing", href: "/pricing"},
    {label: "Dashboard", href: "/dashboard"},
  ],
  Company: [
    {label: "Contact", href: "/contact"},
    {
      label: "GitHub",
      href: "https://github.com/shivasaibatharaju-data/ai-health-vault",
    },
    {label: "Sign up", href: "/signup"},
  ],
  Legal: [
    {label: "Privacy", href: "/privacy"},
    {label: "Terms", href: "/terms"},
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.5fr_2fr]">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink-600 dark:text-ink-300">
            A secure, intelligent home for understanding your health records.
            Built as a portfolio MVP with synthetic data.
          </p>
          <div className="mt-5 flex gap-2" aria-label="Social links">
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <span
                key={index}
                className="grid size-9 place-items-center rounded-lg border border-ink-200 text-ink-500 dark:border-white/10 dark:text-ink-300"
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h2 className="text-sm font-bold text-ink-950 dark:text-white">
                {group}
              </h2>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-ink-200 py-5 dark:border-white/10">
        <div className="container-shell flex flex-col gap-2 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between dark:text-ink-400">
          <p>Copyright 2026 AI Health Vault. Portfolio demonstration.</p>
          <p>Not medical advice. Not a HIPAA-certified service.</p>
        </div>
      </div>
    </footer>
  );
}
