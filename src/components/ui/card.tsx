import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      "rounded-3xl border border-white/10 bg-sand/80 p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur",
      className,
    )}
  >
    {children}
  </div>
);
