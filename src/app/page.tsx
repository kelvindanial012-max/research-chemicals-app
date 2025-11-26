import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { ReviewMarquee } from "@/components/marketing/review-marquee";
import {
  fetchProducts,
  fetchSuppliers,
} from "@/lib/data-service";
import { generateReviews } from "@/lib/review-generator";
import { siteConfig } from "@/lib/site-config";

const WHY_LABS = [
  {
    title: "Batch-synced docs",
    detail: "COA/MSDS attached to every lot. No inbox hunting.",
    tag: "Docs",
  },
  {
    title: "Cold chain ready",
    detail: "Storage, expiry, and temperature logs in one timeline.",
    tag: "Cold",
  },
  {
    title: "Clearance lock",
    detail: "Pricing + ordering unlock only after approval.",
    tag: "Lock",
  },
];

export default async function HomePage() {
  const [allProducts, supplierList] = await Promise.all([
    fetchProducts(),
    fetchSuppliers(),
  ]);
  const featured = allProducts.slice(0, 3);
  const reviews = generateReviews();

  return (
    <div className="flex flex-col gap-16 px-4 py-16 text-white sm:px-6 lg:px-10">
      <section className="rounded-[48px] border border-white/5 bg-[#040a18] p-8 shadow-[0_40px_90px_rgba(0,0,0,0.6)] sm:p-10 lg:p-12">
        <div className="space-y-6 lg:max-w-4xl">
            <p className="inline-flex rounded-full border border-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Verified supply · Research only
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
                Research chemicals. Without the noise.
              </h1>
              <p className="max-w-2xl text-lg text-white/70">
                A private catalog for labs that need clean documentation, quiet
                logistics, and reliable lots. Browse compliant batches without
                endless forms or sales chatter.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/products">Browse catalog</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Request clearance</Link>
              </Button>
            </div>
        </div>
        <div className="mt-12 rounded-[32px] border border-white/10 bg-[#050e1f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Why labs use us
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {WHY_LABS.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
                  {reason.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-white/65">{reason.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Catalog"
          title="Featured research supplies"
          description="Shortest path from request to release: transparent suppliers, doc bundles, and ready-to-book lots."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              supplier={supplierList.find(
                (supplier) => supplier.id === product.supplierId,
              )}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/products">View all products</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/faq">Compliance FAQ</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Community"
          title="Lab reviews"
          description="What operators say about ChemPort in the field."
          align="center"
        />
        <ReviewMarquee reviews={reviews} />
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
        <SectionHeading
          eyebrow="B2B Portal"
          title="Wholesale & procurement partner program"
          description="Verified labs unlock tiered pricing, flexible payment terms, and automated invoicing rails."
        />
        <div className="mt-6 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/contact">Request onboarding</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/about">Read about ChemPort</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/70">
          Need documentation before your internal audit? Email{" "}
          {siteConfig.contact.email} for a compliance packet (COI, insurance,
          data-handling overview).
        </p>
      </section>
    </div>
  );
}
