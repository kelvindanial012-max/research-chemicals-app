import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Product, Supplier } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  supplier?: Supplier;
}

export const ProductCard = ({ product, supplier }: ProductCardProps) => {
  const inStock = product.availability === "in_stock";
  const locationLabel = supplier?.location ?? "verified labs";

  return (
    <Card className="group flex flex-col gap-5 overflow-hidden border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white/5">
        {product.heroImage ? (
          <Image
            src={product.heroImage}
            alt={`${product.name} hero art`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-5xl font-semibold text-white/70">
            {product.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {product.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {product.name}
          </h3>
        </div>
        <p className="text-2xl font-semibold text-white">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/50">
          {inStock ? "Available for shipment to" : "Backordered for"}
        </p>
        <p className="mt-2 text-base text-white">{locationLabel}</p>
      </div>

      <Button variant="secondary" asChild className="mt-auto">
        <Link href={`/products/${product.slug}`}>View product</Link>
      </Button>
    </Card>
  );
};
