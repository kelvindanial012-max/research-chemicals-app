import type { ReviewTestimonial } from "@/lib/types";

const FIRST_NAMES = [
  "Maya",
  "Lucas",
  "Noah",
  "Elena",
  "Priya",
  "Ezra",
  "Sofia",
  "Jamal",
  "Isla",
  "Hiro",
  "Camila",
  "Mateo",
  "Asha",
  "Leo",
  "Wren",
  "Ivy",
  "Anya",
  "Theo",
  "Nadia",
  "Kai",
];

const LAST_NAMES = [
  "Patel",
  "Kim",
  "Nguyen",
  "Marshall",
  "Davies",
  "Silva",
  "Carter",
  "Lopez",
  "O'Neil",
  "Rossi",
  "Okafor",
  "Whitfield",
  "Cheng",
  "Blake",
  "Hernandez",
  "Ito",
  "Costa",
  "Foster",
  "Kaur",
  "Morgan",
];

const ROLE_DESCRIPTORS = [
  "Lab Director",
  "Procurement Lead",
  "QC Analyst",
  "Principal Investigator",
  "Operations Manager",
  "Clinical Scientist",
  "Formulation Chemist",
  "Compliance Officer",
  "Automation Engineer",
  "Toxicology Lead",
];

const LAB_TYPES = [
  "Oncology Lab",
  "Peptide Core",
  "Contract Research Group",
  "Academic Research Lab",
  "Diagnostics Startup",
  "Regenerative Lab",
  "Biologics Facility",
  "Analytical Lab",
  "Biotech Incubator",
  "Neuro Lab",
];

const OPENERS = [
  "Documentation arrives organized and audit-ready.",
  "Hands-down the cleanest supply chain workflow we have tried.",
  "Finally a catalog that respects regulated teams.",
  "Shipping transparency beats every distributor we've used.",
  "We cleared procurement in days instead of weeks.",
  "Customer success actually understands lab reality.",
  "Digital paperwork cut our compliance prep in half.",
  "Every batch code ties back to a doc bundle instantly.",
  "Inventory forecasting is finally predictable.",
  "Same-day answers on COA questions saved our sprint.",
];

const IMPACTS = [
  "The peptide quality has been flawless.",
  "Buffers land cold, labeled, and ready to log.",
  "Our sterile fills never miss a spec.",
  "We finally trust a supplier with traceability.",
  "QA checks went from 2 hours to 20 minutes.",
  "Docs sync straight into our ELN without edits.",
  "Lot status is visible to the whole ops team.",
  "Their team flags expiring stock before we do.",
  "International shipments come with zero surprises.",
  "Automation scripts pull their pricing without hacks.",
];

const CLOSERS = [
  "Would recommend to any lab protecting schedule integrity.",
  "We reallocated a full headcount worth of manual checks.",
  "It's the only vendor legal gave an instant yes on.",
  "Even our auditors asked who built their workflows.",
  "We signed up our second site within a week.",
  "The team feels like an extension of our internal staff.",
  "Turnaround is consistent even during rush quarters.",
  "Hard to imagine going back to spreadsheets.",
  "It just removed the noise so science can move.",
  "Perfect balance of compliance and speed.",
];

const RATING_OPTIONS: ReviewTestimonial["rating"][] = [5, 4.5, 4];

const pick = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const generateReviews = (count?: number): ReviewTestimonial[] => {
  const total = count ?? Math.floor(Math.random() * 51) + 150;

  return Array.from({ length: total }).map((_, index) => {
    const author = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    const role = `${pick(ROLE_DESCRIPTORS)} • ${pick(LAB_TYPES)}`;
    const rating = pick(RATING_OPTIONS);
    const quote = `${pick(OPENERS)} ${pick(IMPACTS)} ${pick(CLOSERS)}`;

    return {
      id: `review-${index}`,
      author,
      role,
      rating,
      quote,
    };
  });
};
