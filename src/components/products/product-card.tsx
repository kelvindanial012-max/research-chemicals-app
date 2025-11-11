import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Product, Supplier } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  supplier?: Supplier;
}

export const ProductCard = ({ product, supplier }: ProductCardProps) => {
  const status =
    product.availability === "in_stock" ? "Available for shipment" : "Backorder";

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          {product.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-ocean">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{product.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
          label={product.purity}
          variant="default"
          className="bg-slate/60 text-slate-700"
        />
        <Badge
          label={product.volume}
          variant="default"
          className="bg-white text-ocean border border-slate/60"
        />
        <Badge
          label={status}
          variant={product.availability === "in_stock" ? "success" : "warning"}
        />
      </div>
      <div className="mt-auto space-y-2">
        <p className="text-2xl font-semibold text-ocean">
          {formatCurrency(product.price)}
        </p>
        {supplier && (
          <p className="text-xs text-slate-500">
            Supplier: {supplier.name} ·{" "}
            {supplier.verificationStatus === "verified" ? "ChemPort Verified" : "Pending Verification"}
          </p>
        )}
      </div>
      <Button asChild>
        <Link href={`/products/${product.slug}`}>View product</Link>
      </Button>
    </Card>
  );
};
