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
    "bg-ocean text-white hover:bg-ocean/90 focus-visible:ring-ocean/40 shadow-sm",
  secondary:
    "bg-white text-ocean hover:bg-sky focus-visible:ring-sky border border-ocean/20",
  ghost: "text-ocean hover:bg-slate/30",
  outline:
    "border border-ocean/40 text-ocean hover:bg-white focus-visible:ring-sky",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
