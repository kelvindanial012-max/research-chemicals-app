const TRUST_POINTS = [
  { value: "48h", label: "COA / MSDS review SLA" },
  { value: "120+", label: "Research labs onboarded" },
  { value: "99.3%", label: "Average purity across catalog" },
  { value: "RLS", label: "Row Level Security enabled data" },
];

export const TrustBadges = () => (
  <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
    {TRUST_POINTS.map((point) => (
      <div key={point.label} className="space-y-1">
        <p className="text-2xl font-semibold text-white">{point.value}</p>
        <p className="text-sm text-white/60">{point.label}</p>
      </div>
    ))}
  </div>
);
