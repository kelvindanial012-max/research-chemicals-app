import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "default";
  className?: string;
}

const variantMap = {
  default: "bg-slate text-ocean",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
};

export const Badge = ({
  label,
  variant = "default",
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
      variantMap[variant],
      className,
    )}
  >
    {label}
  </span>
);
