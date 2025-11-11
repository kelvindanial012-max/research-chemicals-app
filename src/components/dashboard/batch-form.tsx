"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Product } from "@/lib/types";
import { createBatchAction, type CreateBatchState } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";

const initialState: CreateBatchState = {};

interface BatchFormProps {
  products: Product[];
}

export const BatchForm = ({ products }: BatchFormProps) => {
  const [state, formAction] = useActionState(createBatchAction, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-slate/60 bg-white p-6"
    >
      <h3 className="text-lg font-semibold text-ocean">Log a batch</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Product
          <select
            name="productId"
            required
            className="mt-1 w-full rounded-2xl border border-slate/60 bg-white px-4 py-2 focus:border-ocean focus:outline-none"
          >
            <option value="">Select product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Lot number
          <input
            name="lotNumber"
            required
            placeholder="CBW-1125A"
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Expiry date
          <input
            type="date"
            name="expiryDate"
            required
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Storage conditions
          <input
            name="storageConditions"
            required
            placeholder="Store at 20-25°C, protect from light"
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
        </label>
      </div>
      <label className="text-sm font-semibold text-slate-700">
        Notes
        <textarea
          name="notes"
          rows={3}
          placeholder="Opened 2025-11-02, discard after 28 days"
          className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
        />
      </label>
      <div className="flex flex-col gap-2">
        <SubmitButton />
        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        {state?.message && (
          <p className="text-sm text-emerald-600">{state.message}</p>
        )}
      </div>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging..." : "Save batch"}
    </Button>
  );
};
