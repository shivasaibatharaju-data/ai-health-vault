"use client";

import {AlertTriangle} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 p-5 dark:bg-ink-950">
      <div className="panel max-w-md p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <AlertTriangle className="size-5" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
          The page could not be loaded. Your records have not been changed.
        </p>
        <Button type="button" className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
