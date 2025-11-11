import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) => (
  <div
    className={cn(
      "space-y-3",
      align === "center" && "text-center mx-auto max-w-3xl",
      className,
    )}
  >
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean/80">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold text-ocean">{title}</h2>
    {description && (
      <p className="text-base text-slate-700">{description}</p>
    )}
  </div>
);
