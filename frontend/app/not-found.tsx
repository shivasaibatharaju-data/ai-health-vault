import {FileQuestion} from "lucide-react";

import {ButtonLink} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 p-5 text-center dark:bg-ink-950">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-200">
          <FileQuestion className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold">This page is not in the vault</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-600 dark:text-ink-300">
          The address may be incorrect, or the page may have moved.
        </p>
        <ButtonLink href="/" className="mt-6">
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}
