import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  asChild?: boolean;
}

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[#3c82ff] text-white shadow-[0_12px_35px_rgba(29,78,216,0.45)] hover:bg-[#5a96ff] focus-visible:ring-[#82b0ff]",
  secondary:
    "border border-white/30 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/30",
  ghost: "text-white/70 hover:text-white hover:bg-white/5",
  outline:
    "border border-white/40 text-white hover:border-white hover:bg-white/5 focus-visible:ring-white/30",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
          variantMap[variant],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
