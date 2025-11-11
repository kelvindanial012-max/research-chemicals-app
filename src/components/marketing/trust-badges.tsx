const TRUST_POINTS = [
  { value: "48h", label: "COA / MSDS review SLA" },
  { value: "120+", label: "Research labs onboarded" },
  { value: "99.3%", label: "Average purity across catalog" },
  { value: "RLS", label: "Row Level Security enabled data" },
];

export const TrustBadges = () => (
  <div className="grid gap-4 rounded-3xl border border-slate/60 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
    {TRUST_POINTS.map((point) => (
      <div key={point.label} className="space-y-1">
        <p className="text-2xl font-semibold text-ocean">{point.value}</p>
        <p className="text-sm text-slate-600">{point.label}</p>
      </div>
    ))}
  </div>
);
