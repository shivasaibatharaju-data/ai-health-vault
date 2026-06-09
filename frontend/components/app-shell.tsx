"use client";

import {
  Bot,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UploadCloud,
  Waypoints,
  X,
} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

import {BrandLogo} from "@/components/brand-logo";
import {ThemeToggle} from "@/components/theme-toggle";
import {cn} from "@/lib/utils";

const navigation = [
  {href: "/dashboard", label: "Overview", icon: LayoutDashboard},
  {href: "/upload", label: "Upload records", icon: UploadCloud},
  {href: "/records", label: "Records library", icon: FileText},
  {href: "/chat", label: "AI assistant", icon: Bot},
  {href: "/timeline", label: "Health timeline", icon: Waypoints},
];

function Navigation({
  collapsed,
  closeMobile,
}: {
  collapsed: boolean;
  closeMobile?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Application">
      {navigation.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition",
              active
                ? "bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200"
                : "text-ink-600 hover:bg-ink-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white",
              collapsed && "justify-center px-2",
            )}
          >
            <item.icon className="size-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({children}: {children: React.ReactNode}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-ink-200 bg-white transition-[width] duration-200 dark:border-white/10 dark:bg-ink-900 lg:flex lg:flex-col",
          collapsed ? "w-[84px]" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-[72px] items-center border-b border-ink-200 px-5 dark:border-white/10",
            collapsed && "justify-center px-3",
          )}
        >
          <BrandLogo href="/dashboard" compact={collapsed} />
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          <Navigation collapsed={collapsed} />
          <div className="mt-auto space-y-1 pt-6">
            <Link
              href="/settings"
              title={collapsed ? "Profile and settings" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Settings className="size-5" aria-hidden="true" />
              {!collapsed && "Profile and settings"}
            </Link>
            <Link
              href="/contact"
              title={collapsed ? "Help and support" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <CircleHelp className="size-5" aria-hidden="true" />
              {!collapsed && "Help and support"}
            </Link>
            <Link
              href="/"
              title={collapsed ? "Log out" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <LogOut className="size-5" aria-hidden="true" />
              {!collapsed && "Log out"}
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="absolute -right-3 top-24 grid size-7 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-sm dark:border-white/10 dark:bg-ink-800"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="size-4" aria-hidden="true" />
          )}
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/50"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[min(84vw,320px)] flex-col bg-white p-4 shadow-2xl dark:bg-ink-900">
            <div className="flex items-center justify-between">
              <BrandLogo href="/dashboard" />
              <button
                type="button"
                className="grid size-10 place-items-center rounded-xl hover:bg-ink-100 dark:hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8">
              <Navigation
                collapsed={false}
                closeMobile={() => setMobileOpen(false)}
              />
            </div>
            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className="mt-auto flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink-600 dark:text-ink-300"
            >
              <Settings className="size-5" aria-hidden="true" />
              Profile and settings
            </Link>
          </aside>
        </div>
      )}

      <div
        className={cn(
          "transition-[padding] duration-200",
          collapsed ? "lg:pl-[84px]" : "lg:pl-64",
        )}
      >
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-ink-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 dark:border-white/10 dark:bg-ink-950/85 lg:px-8">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-ink-200 lg:hidden dark:border-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              Personal health workspace
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-xl border border-ink-200 py-1.5 pl-1.5 pr-3 dark:border-white/10"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                AS
              </span>
              <span className="hidden text-sm font-semibold sm:block">
                Alex Smith
              </span>
            </Link>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
