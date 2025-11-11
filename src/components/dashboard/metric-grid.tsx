import type { DashboardMetrics } from "@/lib/types";
import { Card } from "@/components/ui/card";

const getLabel = (key: keyof DashboardMetrics) => {
  switch (key) {
    case "totalSpend":
      return "Total Spend";
    case "averageOrderValue":
      return "Avg Order Value";
    case "batchesTracked":
      return "Batches Tracked";
    case "complianceDocuments":
      return "Compliance Docs";
    default:
      return key;
  }
};

const currencyKeys: (keyof DashboardMetrics)[] = [
  "totalSpend",
  "averageOrderValue",
];

export const MetricGrid = ({ metrics }: { metrics: DashboardMetrics }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {Object.entries(metrics).map(([key, value]) => {
      const isCurrency = currencyKeys.includes(key as keyof DashboardMetrics);
      const display = isCurrency
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(value as number)
        : value;

      return (
        <Card key={key}>
          <p className="text-sm text-slate-500">{getLabel(key as keyof DashboardMetrics)}</p>
          <p className="mt-2 text-2xl font-semibold text-ocean">{display}</p>
        </Card>
      );
    })}
  </div>
);
