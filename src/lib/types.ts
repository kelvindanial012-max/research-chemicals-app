export type ProductCategory =
  | "Bacteriostatic Water"
  | "Peptides"
  | "Solvents"
  | "Buffers"
  | "Accessories";

export interface Supplier {
  id: string;
  name: string;
  location: string;
  verificationStatus: "verified" | "pending";
  contactEmail: string;
  coaUrl?: string;
  msdsUrl?: string;
  reliabilityScore: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  purity: string;
  volume: string;
  summary: string;
  description: string;
  price: number;
  stock: number;
  availability: "in_stock" | "backorder";
  supplierId: string;
  tags: string[];
  heroImage?: string;
  documents?: {
    coa?: string;
    msds?: string;
  };
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  complianceTags: string[];
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  heroImage?: string;
  summary: string;
  body: string;
  readTime: string;
  category: string;
  updatedAt: string;
}

export interface BatchRecord {
  id: string;
  productId: string;
  lotNumber: string;
  expiryDate: string;
  storageConditions: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: "processing" | "fulfilled" | "on_hold";
  placedAt: string;
  total: number;
  items: OrderItem[];
}

export interface DashboardMetrics {
  totalSpend: number;
  averageOrderValue: number;
  batchesTracked: number;
  complianceDocuments: number;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory | "All";
  purity?: string;
  supplierId?: string;
  availability?: "in_stock" | "backorder" | "All";
}

export interface ReviewTestimonial {
  id: string;
  author: string;
  role: string;
  rating: 4 | 4.5 | 5;
  quote: string;
}
