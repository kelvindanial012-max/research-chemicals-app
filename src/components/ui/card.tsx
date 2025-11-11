import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={cn("rounded-3xl border border-slate/60 bg-white p-6", className)}>
    {children}
  </div>
);
