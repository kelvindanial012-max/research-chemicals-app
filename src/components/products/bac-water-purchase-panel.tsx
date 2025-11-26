"use client";

import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/products/checkout-button";
import { formatCurrency } from "@/lib/utils";

const DISCOUNT_TIERS = [
  { label: "3 Bottles", detail: "You can 10% off." },
  { label: "6 Bottles", detail: "You can 15% off." },
  { label: "9 Bottles", detail: "You can 20% off." },
];

interface BacWaterPurchasePanelProps {
  productId: string;
  unitPrice: number;
}

export const BacWaterPurchasePanel = ({
  productId,
  unitPrice,
}: BacWaterPurchasePanelProps) => {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "added">("idle");

  const total = useMemo(
    () => formatCurrency(quantity * unitPrice),
    [quantity, unitPrice],
  );

  const updateQuantity = (next: number) => {
    setQuantity(Math.max(1, next));
    setStatus("idle");
  };

  const handleAddToCart = () => {
    setStatus("added");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-slate/60">
          <button
            type="button"
            className="h-12 w-12 text-2xl text-ocean"
            onClick={() => updateQuantity(quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(event) => updateQuantity(Number(event.target.value) || 1)}
            className="h-12 w-16 border-x border-slate/60 text-center text-xl font-semibold text-ocean focus:outline-none"
          />
          <button
            type="button"
            className="h-12 w-12 text-2xl text-ocean"
            onClick={() => updateQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <Button className="h-12 px-10 text-base uppercase" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
      </div>
      <CheckoutButton productId={productId} quantity={quantity} />
      {status === "added" && (
        <p className="text-sm text-emerald-500">
          Added {quantity} × Bacteriostatic Water 10mL to cart (demo state).
        </p>
      )}
      <p className="text-sm text-slate-400">
        Subtotal:&nbsp;
        <span className="font-semibold text-white">{total}</span>
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {DISCOUNT_TIERS.map((tier) => (
          <div
            key={tier.label}
            className="rounded-2xl border border-slate/60 bg-[#121a23] p-4 text-center text-slate-200"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              By buying
            </p>
            <p className="text-xl font-semibold">{tier.label}</p>
            <p className="text-xs text-slate-400">{tier.detail}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-rose-300">
        To get a discount, simply add products to the cart and continue to checkout. The discount
        applies automatically when the tier is met.
      </p>
    </div>
  );
};
