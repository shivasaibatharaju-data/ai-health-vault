import {cn} from "@/lib/utils";

export function StatusPill({status}: {status: string}) {
  const style =
    status === "Ready"
      ? "bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200"
      : status === "Processing"
        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200"
        : "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
        style,
      )}
    >
      {status}
    </span>
  );
}
