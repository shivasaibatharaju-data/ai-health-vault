import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import {cn} from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400",
  secondary:
    "border border-ink-200 bg-white text-ink-900 hover:border-brand-300 hover:bg-brand-50 dark:border-white/15 dark:bg-ink-900 dark:text-white dark:hover:bg-ink-800",
  ghost:
    "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
};

type ButtonVariant = keyof typeof variants;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {variant?: ButtonVariant}) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
