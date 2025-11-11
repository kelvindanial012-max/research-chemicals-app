import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  fetchProductBySlug,
  fetchProducts,
  fetchSuppliers,
} from "@/lib/data-service";
import { ProductCard } from "@/components/products/product-card";
import { ProductPurchasePanel } from "@/components/products/product-purchase-panel";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const items = await fetchProducts();
  return items.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const [supplierList, relatedProducts] = await Promise.all([
    fetchSuppliers(),
    fetchProducts({ category: product.category }),
  ]);
  const supplier = supplierList.find((item) => item.id === product.supplierId);
  const related = relatedProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6 rounded-[32px] border border-slate/60 bg-white p-10 shadow-sm">
          <Badge
            label={product.category}
            className="bg-slate/40 text-slate-600"
          />
          <h1 className="text-4xl font-semibold text-ocean">{product.name}</h1>
          <p className="text-lg text-slate-700">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge label={product.purity} />
            <Badge label={product.volume} />
            <Badge
              label={
                product.availability === "in_stock"
                  ? "In stock"
                  : "Available on backorder"
              }
              variant={product.availability === "in_stock" ? "success" : "warning"}
            />
          </div>
          <div className="rounded-3xl bg-sand p-4 text-sm text-slate-600">
            Research-only notation: Requires agreement to compliance statement and intended-use confirmation before checkout. Not for human consumption.
          </div>
          {supplier && (
            <div className="rounded-3xl border border-slate/60 bg-sand/60 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-ocean/70">
                Supplier
              </p>
              <p className="text-lg font-semibold text-ocean">{supplier.name}</p>
              <p className="text-slate-600">{supplier.location}</p>
              <p className="text-xs text-slate-500">
                Verification status: {supplier.verificationStatus}
              </p>
              <div className="mt-2 flex flex-col gap-2 text-xs">
                {product.documents?.coa && (
                  <Link href={product.documents.coa} className="text-sky underline">
                    COA download
                  </Link>
                )}
                {product.documents?.msds && (
                  <Link href={product.documents.msds} className="text-sky underline">
                    MSDS download
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
        <ProductPurchasePanel product={product} />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Documentation"
          title="Handling & storage guidance"
          description="Each batch ships with COA/MSDS, temperature requirements, and expiry tracking."
        />
        <div className="rounded-[32px] border border-slate/60 bg-white p-8 text-sm text-slate-700 shadow-sm">
          <ul className="list-disc space-y-2 pl-5">
            <li>Store at manufacturer-specified temperature ranges.</li>
            <li>Log lot number + expiry in the dashboard for audit readiness.</li>
            <li>Use PPE and follow institution SOPs when handling.</li>
            <li>Discard bacteriostatic water 28 days after first puncture.</li>
          </ul>
        </div>
      </section>

      {!!related.length && (
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Related"
            title="Researchers also view"
            description="Adjacent categories to support your experiment workflow."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                supplier={supplierList.find((sup) => sup.id === item.supplierId)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
