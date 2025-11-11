"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  productId: string;
  quantity?: number;
}

export const CheckoutButton = ({
  productId,
  quantity = 1,
}: CheckoutButtonProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleCheckout = async () => {
    try {
      setStatus("loading");
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error ?? "Unable to create checkout session");
      }
      window.location.href = payload.url;
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleCheckout} disabled={status === "loading"}>
        {status === "loading" ? "Redirecting..." : "Secure checkout"}
      </Button>
      {status === "error" && (
        <p className="text-xs text-red-600">
          Stripe not configured. Add STRIPE keys to .env or contact support.
        </p>
      )}
    </div>
  );
};
