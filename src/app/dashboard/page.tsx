import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  fetchBatchRecords,
  fetchDashboardMetrics,
  fetchOrders,
  fetchProducts,
} from "@/lib/data-service";
import { MetricGrid } from "@/components/dashboard/metric-grid";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { BatchTable } from "@/components/dashboard/batch-table";
import { BatchForm } from "@/components/dashboard/batch-form";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/login/actions";

interface DashboardPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const [metrics, orders, batches, products] = await Promise.all([
    fetchDashboardMetrics(),
    fetchOrders(),
    fetchBatchRecords(),
    fetchProducts(),
  ]);
  const checkoutSuccess = searchParams?.checkout === "success";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Dashboard"
          title="Orders, compliance, and batch tracking"
          description="Once Supabase auth is connected this page will be protected with middleware using RLS policies."
        />
        <form action={signOutAction}>
          <Button variant="ghost" type="submit">
            Sign out
          </Button>
        </form>
      </div>

      {checkoutSuccess && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Payment captured via Stripe. Fulfillment status will update once the order syncs from the webhook.
        </div>
      )}

      <MetricGrid metrics={metrics} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ocean">Recent orders</h2>
          <Link href="/products" className="text-sm text-sky underline">
            Reorder supplies
          </Link>
        </div>
        <OrdersTable orders={orders} products={products} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.65fr,0.35fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ocean">Batch tracker</h2>
          <BatchTable batches={batches} products={products} />
        </div>
        <BatchForm products={products} />
      </section>
    </div>
  );
}
