import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { TrustBadges } from "@/components/marketing/trust-badges";
import {
  fetchKnowledgeArticles,
  fetchProducts,
  fetchSuppliers,
} from "@/lib/data-service";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [allProducts, articles, supplierList] = await Promise.all([
    fetchProducts(),
    fetchKnowledgeArticles(),
    fetchSuppliers(),
  ]);
  const featured = allProducts.slice(0, 3);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6 rounded-[32px] border border-slate/50 bg-white/90 p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-ocean/60">
            Verified supply · Research only
          </p>
          <h1 className="text-4xl font-semibold text-ocean lg:text-5xl">
            Trusted access to research-only chemicals with documentation in one
            click.
          </h1>
          <p className="text-lg text-slate-700">
            ChemPort connects labs to vetted suppliers with transparent COA/MSDS
            files, compliance workflows, and an audit-trailed dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/products">Browse catalog</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/knowledge-base">Read knowledge base</Link>
            </Button>
          </div>
          <div className="rounded-3xl bg-sand/80 p-4 text-sm text-slate-600">
            Research-use disclaimer · Orders require agreement to ChemPort&apos;s
            compliance statement and valid institutional affiliation.
          </div>
        </div>
        <div className="space-y-4 rounded-[32px] border border-slate/60 bg-gradient-to-br from-ocean to-sky p-8 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Dashboard preview
          </p>
          <h2 className="text-3xl font-semibold">
            Batch tracker + supplier verification
          </h2>
          <ul className="space-y-4 text-sm leading-relaxed text-white/90">
            <li>• Save COA/MSDS packets per purchase</li>
            <li>• Track lot, expiry, and storage instructions</li>
            <li>• Export PDF audit summaries in one click</li>
          </ul>
          <div className="rounded-3xl bg-white/10 p-4 text-sm">
            <p className="font-semibold">B2B labs</p>
            <p className="text-white/80">
              Enable auto-invoicing, repeat orders, and procurement approvals.
            </p>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Catalog"
          title="Featured research supplies"
          description="Every item includes batch-level traceability, supplier verification, and COA/MSDS packets."
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

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Education"
          title="Knowledge base"
          description="Operational SOPs, calculators, and compliance explainers for your research team."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <KnowledgeCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate/60 bg-white p-10 shadow-lg">
        <SectionHeading
          eyebrow="B2B Portal"
          title="Wholesale & procurement partner program"
          description="Verified labs unlock tiered pricing, payment terms, and automated invoicing."
        />
        <div className="mt-6 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/contact">Request onboarding</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/about">Read about ChemPort</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Need documentation ahead of your internal audit? Email{" "}
          {siteConfig.contact.email} for a compliance packet (COI, insurance,
          data-handling overview).
        </p>
      </section>
    </div>
  );
}
