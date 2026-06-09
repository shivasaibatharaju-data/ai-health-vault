import {HeartPulse} from "lucide-react";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 dark:bg-ink-950">
      <div className="text-center">
        <span className="mx-auto grid size-14 animate-pulse place-items-center rounded-2xl bg-brand-600 text-white dark:bg-brand-400 dark:text-ink-950">
          <HeartPulse className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm font-semibold text-ink-600 dark:text-ink-300">
          Opening your health vault...
        </p>
      </div>
    </div>
  );
}
