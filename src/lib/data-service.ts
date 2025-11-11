import {
  batchRecords,
  dashboardMetrics,
  faqs,
  knowledgeArticles,
  products,
  recentOrders,
  suppliers,
} from "@/data/mock-data";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import type {
  BatchRecord,
  DashboardMetrics,
  Faq,
  KnowledgeArticle,
  Order,
  Product,
  ProductFilters,
  Supplier,
} from "@/lib/types";

const applyProductFilters = (
  list: Product[],
  filters?: ProductFilters,
): Product[] => {
  if (!filters) {
    return list;
  }

  return list.filter((product) => {
    const matchesSearch = filters.search
      ? `${product.name} ${product.summary} ${product.category}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      : true;
    const matchesCategory =
      !filters.category ||
      filters.category === "All" ||
      product.category === filters.category;
    const matchesPurity = filters.purity
      ? product.purity?.toLowerCase().includes(filters.purity.toLowerCase())
      : true;
    const matchesSupplier = filters.supplierId
      ? product.supplierId === filters.supplierId
      : true;
    const matchesAvailability =
      !filters.availability ||
      filters.availability === "All" ||
      product.availability === filters.availability;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPurity &&
      matchesSupplier &&
      matchesAvailability
    );
  });
};

export const fetchProducts = async (
  filters?: ProductFilters,
): Promise<Product[]> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.category && filters.category !== "All") {
        query = query.eq("category", filters.category);
      }

      if (filters?.availability && filters.availability !== "All") {
        query = query.eq("availability", filters.availability);
      }

      if (filters?.supplierId) {
        query = query.eq("supplier_id", filters.supplierId);
      }

      if (filters?.search) {
        query = query.ilike("name", `%${filters.search}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        return data as unknown as Product[];
      }
    } catch (err) {
      console.warn("Supabase fetchProducts fallback", err);
    }
  }

  return applyProductFilters(products, filters);
};

export const fetchProductBySlug = async (
  slug: string,
): Promise<Product | undefined> => {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", normalizedSlug)
        .single();
      if (!error && data) {
        return data as unknown as Product;
      }
    } catch (err) {
      console.warn("Supabase fetchProductBySlug fallback", err);
    }
  }

  return products.find(
    (product) => product.slug.toLowerCase() === normalizedSlug,
  );
};

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("suppliers").select("*");
      if (!error && data) {
        return data as unknown as Supplier[];
      }
    } catch (err) {
      console.warn("Supabase fetchSuppliers fallback", err);
    }
  }

  return suppliers;
};

export const fetchKnowledgeArticles = async (): Promise<
  KnowledgeArticle[]
> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!error && data) {
        return data as unknown as KnowledgeArticle[];
      }
    } catch (err) {
      console.warn("Supabase fetchKnowledgeArticles fallback", err);
    }
  }

  return knowledgeArticles;
};

export const fetchArticleBySlug = async (
  slug: string,
): Promise<KnowledgeArticle | undefined> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) {
        return data as unknown as KnowledgeArticle;
      }
    } catch (err) {
      console.warn("Supabase fetchArticleBySlug fallback", err);
    }
  }

  return knowledgeArticles.find((article) => article.slug === slug);
};

export const fetchFaqs = async (): Promise<Faq[]> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("faqs").select("*");
      if (!error && data) {
        return data as unknown as Faq[];
      }
    } catch (err) {
      console.warn("Supabase fetchFaqs fallback", err);
    }
  }

  return faqs;
};

export const fetchBatchRecords = async (): Promise<BatchRecord[]> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("batches")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data as unknown as BatchRecord[];
      }
    } catch (err) {
      console.warn("Supabase fetchBatchRecords fallback", err);
    }
  }

  return batchRecords;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, items (*)")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data as unknown as Order[];
      }
    } catch (err) {
      console.warn("Supabase fetchOrders fallback", err);
    }
  }

  return recentOrders;
};

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("dashboard_metrics_view")
        .select("*")
        .single();
      if (!error && data) {
        return data as DashboardMetrics;
      }
    } catch (err) {
      console.warn("Supabase fetchDashboardMetrics fallback", err);
    }
  }

  return dashboardMetrics;
};
