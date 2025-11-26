import type { ProductFilters as FilterType } from "@/lib/types";
import { fetchProducts, fetchSuppliers } from "@/lib/data-service";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductCard } from "@/components/products/product-card";

interface ProductsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

const parseFilters = (
  params?: Record<string, string | string[] | undefined>,
): FilterType => ({
  search: params?.search?.toString(),
  category: params?.category?.toString() as FilterType["category"],
  purity: params?.purity?.toString(),
  supplierId: params?.supplierId?.toString(),
  availability: params?.availability?.toString() as FilterType["availability"],
});

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = parseFilters(searchParams);
  const [items, supplierList] = await Promise.all([
    fetchProducts(filters),
    fetchSuppliers(),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <SectionHeading
        eyebrow="Catalog"
        title="Verified research chemicals and accessories"
        description="Filters include purity, supplier verification state, and availability."
      />

      <ProductFilters
        suppliers={supplierList}
        currentSearch={filters.search ?? ""}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            supplier={supplierList.find(
              (supplier) => supplier.id === product.supplierId,
            )}
          />
        ))}
        {!items.length && (
          <p className="text-sm text-slate-600">
            Nothing matches those filters yet. Adjust purity/supplier and try again.
          </p>
        )}
      </div>
    </div>
  );
}
