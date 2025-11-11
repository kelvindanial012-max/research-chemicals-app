"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import type { ProductCategory, Supplier } from "@/lib/types";
import { Button } from "@/components/ui/button";

const categories: (ProductCategory | "All")[] = [
  "All",
  "Bacteriostatic Water",
  "Peptides",
  "Solvents",
  "Buffers",
  "Accessories",
];

interface ProductFiltersProps {
  suppliers: Supplier[];
  currentSearch?: string;
}

export const ProductFilters = ({
  suppliers,
  currentSearch = "",
}: ProductFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  const updateParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "All") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParam("search", search);
  };

  return (
    <div className="rounded-3xl border border-slate/60 bg-white p-6 shadow-sm">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
      >
        <label className="text-sm font-semibold text-slate-700">
          Search
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Sterile water, peptide, solvent..."
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Category
          <select
            defaultValue={searchParams.get("category") ?? "All"}
            onChange={(event) => updateParam("category", event.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate/60 bg-white px-4 py-2 focus:border-ocean focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Supplier
          <select
            defaultValue={searchParams.get("supplierId") ?? ""}
            onChange={(event) => updateParam("supplierId", event.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate/60 bg-white px-4 py-2 focus:border-ocean focus:outline-none"
          >
            <option value="">All suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Availability
          <select
            defaultValue={searchParams.get("availability") ?? "All"}
            onChange={(event) => updateParam("availability", event.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate/60 bg-white px-4 py-2 focus:border-ocean focus:outline-none"
          >
            <option value="All">All</option>
            <option value="in_stock">In stock</option>
            <option value="backorder">Backorder</option>
          </select>
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Apply filters
          </Button>
        </div>
      </form>
    </div>
  );
};
