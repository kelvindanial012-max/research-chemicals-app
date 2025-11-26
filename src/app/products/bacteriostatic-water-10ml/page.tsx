import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { products, suppliers } from "@/data/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { formatCurrency } from "@/lib/utils";
import { BacWaterPurchasePanel } from "@/components/products/bac-water-purchase-panel";

const product = products.find(
  (item) => item.slug === "bacteriostatic-water-10ml",
);

const related = products
  .filter(
    (item) =>
      item.category === product?.category && item.slug !== product?.slug,
  )
  .slice(0, 3);

export default function BacteriostaticWaterPage() {
  if (!product) {
    notFound();
  }
  const supplier = suppliers.find((item) => item.id === product.supplierId);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="rounded-[32px] bg-[#050a12] p-8 text-white shadow-2xl sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
          <div className="rounded-[32px] bg-[#dfe3ea] p-6">
            <div className="h-[360px] rounded-[24px] bg-gradient-to-b from-white to-[#cfd8e3]" />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>5 Star rating from 44 lab reviews</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Bacteriostatic Water
              </p>
              <h1 className="mt-2 text-4xl font-semibold">{product.name}</h1>
            </div>
            <div>
              <p className="text-4xl font-semibold">{formatCurrency(product.price)}</p>
              <p className="text-sm text-emerald-300">In stock · Ships within 48h</p>
            </div>
            <BacWaterPurchasePanel productId={product.id} unitPrice={product.price} />
            <div className="space-y-3 text-sm text-slate-200">
              <p className="text-rose-300">
                Research-only notation: Requires agreement to compliance statement and intended-use
                confirmation.
              </p>
              <p>
                USP-grade sterile water with 0.9% benzyl alcohol for maintaining reconstituted
                peptides. Tamper-evident vials ship with COA + MSDS.
              </p>
            </div>
            {supplier && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Supplier
                </p>
                <p className="text-lg font-semibold text-white">{supplier.name}</p>
                <p>{supplier.location}</p>
                <p className="text-xs text-slate-400">
                  Verification status: {supplier.verificationStatus}
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs">
                  {product.documents?.coa && (
                    <Link href={product.documents.coa} className="text-sky-300 underline">
                      COA download
                    </Link>
                  )}
                  {product.documents?.msds && (
                    <Link href={product.documents.msds} className="text-sky-300 underline">
                      MSDS download
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Documentation"
          title="Handling & storage guidance"
          description="Each batch ships with COA/MSDS, temperature requirements, and expiry tracking."
        />
        <div className="rounded-[32px] border border-slate/60 bg-white p-8 text-sm text-slate-700 shadow-sm">
          <ul className="list-disc space-y-2 pl-5">
            <li>Store between 20-25°C and protect from light.</li>
            <li>Discard 28 days after first puncture even if volume remains.</li>
            <li>Use aseptic technique while drawing volumes for peptide dilution.</li>
            <li>Log the lot number and expiry inside the ChemPort dashboard.</li>
          </ul>
        </div>
      </section>

      {!!related.length && (
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Related"
            title="Researchers also view"
            description="Adjacent categories to support your workflow."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                supplier={suppliers.find((sup) => sup.id === item.supplierId)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
