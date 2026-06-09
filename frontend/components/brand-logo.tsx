import {HeartPulse} from "lucide-react";
import Link from "next/link";

import {cn} from "@/lib/utils";

export function BrandLogo({
  href = "/",
  compact = false,
  className,
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 font-bold", className)}
      aria-label="AI Health Vault home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm dark:bg-brand-400 dark:text-ink-950">
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-lg tracking-tight">
          AI Health <span className="text-brand-600 dark:text-brand-400">Vault</span>
        </span>
      )}
    </Link>
  );
}
