"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Beaker, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { CheckoutButton } from "@/components/products/checkout-button";

interface ProductPurchasePanelProps {
  product: Product;
}

const quickFactMap: Record<string, string[]> = {
  "bacteriostatic-water-10ml": [
    "0.9% benzyl alcohol keeps reconstituted products viable for 28 days.",
    "Sterile USP-grade water, terminally sterilized in ISO-7 suites.",
    "Tamper-evident flip cap with laser-etched lot + expiry.",
  ],
};

export const ProductPurchasePanel = ({
  product,
}: ProductPurchasePanelProps) => {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "added">("idle");

  const quickFacts =
    quickFactMap[product.slug] ??
    [
      "Verified supplier with downloadable COA / MSDS.",
      "Ships with tracked chain-of-custody paperwork.",
      "Batch logging available from the dashboard.",
    ];

  const total = useMemo(
    () => formatCurrency(product.price * quantity),
    [product.price, quantity],
  );

  const adjustQuantity = (delta: number) => {
    setQuantity((current) => {
      const next = current + delta;
      if (next < 1) return 1;
      const max = product.stock > 0 ? product.stock : 99;
      return Math.min(next, max);
    });
    setStatus("idle");
  };

  const handleAddToCart = () => {
    setStatus("added");
    const timer = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(timer);
  };

  const availabilityLabel =
    product.availability === "in_stock"
      ? "Ships within 48h"
      : "Reserve batch (backorder)";

  return (
    <div className="flex flex-col gap-6 rounded-[32px] border border-slate/60 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-slate-500">{availabilityLabel}</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="text-4xl font-semibold text-ocean">
            {formatCurrency(product.price)}
          </p>
          <p className="text-sm text-slate-500">per unit</p>
        </div>
      </div>

      <div className="rounded-3xl bg-sand/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean/70">
          Simple Description
        </p>
        <p className="mt-2 text-sm text-slate-700">{product.summary}</p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Quantity
          <div className="mt-2 flex items-center rounded-full border border-slate/60">
            <button
              type="button"
              className="h-10 w-10 rounded-l-full text-xl text-ocean"
              onClick={() => adjustQuantity(-1)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value) || 1))
              }
              className="h-10 w-full border-x border-slate/50 text-center text-lg font-semibold text-ocean focus:outline-none"
            />
            <button
              type="button"
              className="h-10 w-10 rounded-r-full text-xl text-ocean"
              onClick={() => adjustQuantity(1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </label>
        <p className="text-sm text-slate-600">
          Subtotal:&nbsp;
          <span className="font-semibold text-ocean">{total}</span>
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={handleAddToCart} fullWidth>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        {status === "added" && (
          <p className="text-center text-xs text-emerald-600">
            Added {quantity} × {product.name} to your cart (demo interaction).
          </p>
        )}
        <CheckoutButton productId={product.id} quantity={quantity} />
      </div>

      <div className="space-y-3 rounded-3xl border border-slate/60 bg-sand/40 p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold text-ocean">
          <Beaker className="h-4 w-4" />
          Quick facts
        </p>
        <ul className="space-y-2 text-slate-600">
          {quickFacts.map((fact) => (
            <li key={fact} className="flex gap-2 text-sm">
              <span className="text-sky">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-slate/50 bg-white p-4 text-xs text-slate-600">
        <p className="flex items-center gap-2 font-semibold text-ocean">
          <Info className="h-4 w-4" />
          Compliance Reminder
        </p>
        <p className="mt-2">
          Research-use only. Upload institutional credentials during checkout and
          log the batch in your dashboard for audit trails.
        </p>
      </div>
    </div>
  );
};
