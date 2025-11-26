import type {
  BatchRecord,
  DashboardMetrics,
  Faq,
  KnowledgeArticle,
  Order,
  Product,
  Supplier,
} from "@/lib/types";

export const suppliers: Supplier[] = [
  {
    id: "sup-chemport",
    name: "ChemPort Labs",
    location: "Austin, TX",
    verificationStatus: "verified",
    contactEmail: "compliance@chemport.io",
    coaUrl: "/documents/chemport-coa.pdf",
    msdsUrl: "/documents/chemport-msds.pdf",
    reliabilityScore: 98,
  },
  {
    id: "sup-bioresearch",
    name: "BioResearch Collective",
    location: "Boston, MA",
    verificationStatus: "verified",
    contactEmail: "support@bioresearch.co",
    reliabilityScore: 94,
  },
  {
    id: "sup-northern",
    name: "Northern Analytical",
    location: "Toronto, Canada",
    verificationStatus: "pending",
    contactEmail: "labs@northernanalytical.ca",
    reliabilityScore: 88,
  },
];

export const products: Product[] = [
  {
    id: "prod-bac-water-10ml",
    name: "Bacteriostatic Water 10mL",
    slug: "bacteriostatic-water-10ml",
    category: "Bacteriostatic Water",
    purity: "USP Grade",
    volume: "10mL",
    summary:
      "Sterile water with 0.9% benzyl alcohol for diluting lyophilized compounds.",
    description:
      "Manufactured in ISO-7 cleanrooms with tamper-evident vials. Includes COA and lot tracking for audit trails.",
    price: 19.0,
    heroImage: "/images/products/bacteriostatic-water.svg",
    stock: 240,
    availability: "in_stock",
    supplierId: "sup-chemport",
    tags: ["sterile", "injectable", "lab-use-only"],
    documents: {
      coa: "/documents/bac-water-coa.pdf",
    },
  },
  {
    id: "prod-peptide-ghrp2",
    name: "Peptide GHRP-2 (5mg)",
    slug: "peptide-ghrp2-5mg",
    category: "Peptides",
    purity: "99.3% HPLC",
    volume: "5mg vial",
    summary:
      "Research peptide provided as lyophilized powder with nitrogen purge.",
    description:
      "Third-party verified for purity. Provided with mass spec data and handling guide in Knowledge Base.",
    price: 59.0,
    heroImage: "/images/products/peptide-ghrp2.svg",
    stock: 80,
    availability: "in_stock",
    supplierId: "sup-bioresearch",
    tags: ["lyophilized", "endocrine", "research-only"],
  },
  {
    id: "prod-buffer-phosphate",
    name: "Phosphate Buffer Saline 1X",
    slug: "phosphate-buffer-saline-1x",
    category: "Buffers",
    purity: "Molecular biology grade",
    volume: "500mL",
    summary: "Ready-to-use PBS solution for cell culture workflows.",
    description:
      "Filter sterilized and gamma irradiated for sterile assurance. Includes storage guidance and expiration tracking.",
    price: 29.5,
    heroImage: "/images/products/phosphate-buffer-saline.svg",
    stock: 0,
    availability: "backorder",
    supplierId: "sup-northern",
    tags: ["sterile", "cell-culture"],
  },
  {
    id: "prod-solvent-acn",
    name: "Acetonitrile HPLC Grade",
    slug: "acetonitrile-hplc-grade",
    category: "Solvents",
    purity: "99.9%",
    volume: "1L",
    summary: "Low UV cut-off solvent for chromatography applications.",
    description:
      "Batch tested for water content and inhibitor residues. Ships with hazard labeling compliant with DOT.",
    price: 45.0,
    heroImage: "/images/products/acetonitrile.svg",
    stock: 54,
    availability: "in_stock",
    supplierId: "sup-chemport",
    tags: ["chromatography", "anhydrous"],
  },
  {
    id: "prod-accessory-sterile-vials",
    name: "Sterile Glass Vials (25 pack)",
    slug: "sterile-glass-vials-25-pack",
    category: "Accessories",
    purity: "N/A",
    volume: "25 pack",
    summary: "Depyrogenated borosilicate vials with butyl stoppers.",
    description:
      "Heat treated and individually wrapped. Each pack stamped with batch + expiry for easy logging.",
    price: 35.0,
    heroImage: "/images/products/sterile-glass-vials.svg",
    stock: 120,
    availability: "in_stock",
    supplierId: "sup-bioresearch",
    tags: ["storage", "sterile"],
  },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "kb-bac-water",
    slug: "handling-bacteriostatic-water-safely",
    title: "How to Handle Bacteriostatic Water Safely",
    summary:
      "Step-by-step handling workflow with PPE checklist, dilution math, and disposal guidance.",
    body:
      "## Safe Handling\n\nUse aseptic technique when puncturing vials and discard after 28 days. Store between 20-25°C.\n\n## Documentation\n\nLog every batch in the dashboard to keep compliance-ready records.",
    heroImage: "/images/bac-water.jpg",
    readTime: "5 min read",
    category: "Guides",
    updatedAt: "2025-10-15",
  },
  {
    id: "kb-dilution-101",
    slug: "dilution-101-for-peptide-research",
    title: "Dilution 101 for Peptide Research",
    summary:
      "Formula references and calculator tips for lyophilized peptides with worked examples.",
    body:
      "### Key Formula\n\nConcentration (mg/mL) = Amount (mg) / Volume (mL). Maintain sterile integrity by using bacteriostatic water.",
    heroImage: "/images/dilution.jpg",
    readTime: "7 min read",
    category: "Calculators",
    updatedAt: "2025-09-03",
  },
];

export const faqs: Faq[] = [
  {
    id: "faq-shipping",
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we currently ship to verified labs in Canada, EU, and Australia. Export compliance screening is required for solvents.",
    complianceTags: ["export", "shipping"],
  },
  {
    id: "faq-research-only",
    category: "Compliance",
    question: "Are these products for human use?",
    answer:
      "No. Every product is labeled Research-Only. Purchasing requires agreement to ChemPort's compliance statement at checkout.",
    complianceTags: ["research-only"],
  },
  {
    id: "faq-coa",
    category: "Documentation",
    question: "How do I download COA/MSDS files?",
    answer:
      "Navigate to any product page and select the Documentation tab. Verified suppliers upload COA + MSDS per batch.",
    complianceTags: ["documentation"],
  },
];

export const recentOrders: Order[] = [
  {
    id: "ord-30212",
    status: "fulfilled",
    placedAt: "2025-10-20",
    total: 245.75,
    items: [
      { productId: "prod-bac-water-10ml", quantity: 5, price: 19 },
      { productId: "prod-accessory-sterile-vials", quantity: 3, price: 35 },
    ],
  },
  {
    id: "ord-30256",
    status: "processing",
    placedAt: "2025-11-01",
    total: 118.5,
    items: [{ productId: "prod-peptide-ghrp2", quantity: 2, price: 59 }],
  },
];

export const batchRecords: BatchRecord[] = [
  {
    id: "batch-1001",
    productId: "prod-bac-water-10ml",
    lotNumber: "CBW-1125A",
    expiryDate: "2026-02-01",
    storageConditions: "Store at 20-25°C, protect from light",
    notes: "Opened 2025-11-02, discard after 28 days",
  },
  {
    id: "batch-1002",
    productId: "prod-buffer-phosphate",
    lotNumber: "PBS-5520",
    expiryDate: "2026-07-15",
    storageConditions: "Refrigerate after opening",
  },
];

export const dashboardMetrics: DashboardMetrics = {
  totalSpend: 15845,
  averageOrderValue: 262,
  batchesTracked: batchRecords.length,
  complianceDocuments: 18,
};
