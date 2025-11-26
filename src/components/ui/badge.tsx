import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "default";
  className?: string;
}

const variantMap = {
  default: "bg-white/5 text-white/80 border border-white/15",
  success: "bg-green-500/10 text-green-200 border border-green-400/40",
  warning: "bg-amber-400/10 text-amber-100 border border-amber-300/40",
};

export const Badge = ({
  label,
  variant = "default",
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur",
      variantMap[variant],
      className,
    )}
  >
    {label}
  </span>
);
