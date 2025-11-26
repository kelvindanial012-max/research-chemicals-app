import type { BatchRecord, Product } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BatchTableProps {
  batches: BatchRecord[];
  products: Product[];
}

export const BatchTable = ({ batches, products }: BatchTableProps) => (
  <div className="overflow-hidden rounded-3xl border border-slate/60 bg-white">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-sand text-xs uppercase tracking-[0.3em] text-slate-500">
        <tr>
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Lot</th>
          <th className="px-4 py-3">Expiry</th>
          <th className="px-4 py-3">Storage</th>
          <th className="px-4 py-3">Notes</th>
        </tr>
      </thead>
      <tbody>
        {batches.map((batch) => {
          const product = products.find((p) => p.id === batch.productId);
          return (
            <tr key={batch.id} className="border-t border-slate/40">
              <td className="px-4 py-4 font-semibold text-ocean">
                {product?.name ?? batch.productId}
              </td>
              <td className="px-4 py-4 text-sm">{batch.lotNumber}</td>
              <td className="px-4 py-4">{formatDate(batch.expiryDate)}</td>
              <td className="px-4 py-4 text-sm">{batch.storageConditions}</td>
              <td className="px-4 py-4 text-xs text-slate-600">
                {batch.notes ?? "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
