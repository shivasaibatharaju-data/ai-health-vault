import {cn} from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <span
        className={cn(
          "eyebrow",
          inverse && "border-white/10 bg-white/5 text-brand-200",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl lg:text-5xl dark:text-white",
          inverse && "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300",
            inverse && "text-ink-300",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
