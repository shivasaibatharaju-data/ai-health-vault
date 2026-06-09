import type {LucideIcon} from "lucide-react";
import type {ReactNode} from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid min-h-64 place-items-center px-5 py-12 text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-bold">{title}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-600 dark:text-ink-300">
          {description}
        </p>
        {action && <div className="mt-5">{action}</div>}
      </div>
    </div>
  );
}
