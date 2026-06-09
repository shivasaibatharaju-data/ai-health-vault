"use client";

import {Menu, X} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

import {BrandLogo} from "@/components/brand-logo";
import {ThemeToggle} from "@/components/theme-toggle";
import {ButtonLink} from "@/components/ui/button";

const navigation = [
  {href: "/features", label: "Features"},
  {href: "/pricing", label: "Pricing"},
  {href: "/#security", label: "Security"},
  {href: "/contact", label: "Contact"},
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/85">
      <div className="container-shell flex items-center justify-between py-3">
        <BrandLogo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <ButtonLink href="/login" variant="ghost">
            Log in
          </ButtonLink>
          <ButtonLink href="/signup">Start free</ButtonLink>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-ink-200 dark:border-white/15"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-ink-200 bg-white px-4 py-5 md:hidden dark:border-white/10 dark:bg-ink-950"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ButtonLink href="/login" variant="secondary">
                Log in
              </ButtonLink>
              <ButtonLink href="/signup">Start free</ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
