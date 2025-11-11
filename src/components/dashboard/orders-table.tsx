import { formatDate, formatCurrency } from "@/lib/utils";
import type { Order, Product } from "@/lib/types";

interface OrdersTableProps {
  orders: Order[];
  products: Product[];
}

export const OrdersTable = ({ orders, products }: OrdersTableProps) => (
  <div className="overflow-hidden rounded-3xl border border-slate/60 bg-white">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-sand text-xs uppercase tracking-[0.3em] text-slate-500">
        <tr>
          <th className="px-4 py-3">Order</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Items</th>
          <th className="px-4 py-3">Placed</th>
          <th className="px-4 py-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-t border-slate/40 text-sm">
            <td className="px-4 py-4 font-semibold text-ocean">{order.id}</td>
            <td className="px-4 py-4 capitalize">{order.status}</td>
            <td className="px-4 py-4">
              <ul className="space-y-1 text-xs text-slate-600">
                {order.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <li key={`${order.id}-${item.productId}`}>
                      {item.quantity} × {product?.name ?? item.productId}
                    </li>
                  );
                })}
              </ul>
            </td>
            <td className="px-4 py-4">{formatDate(order.placedAt)}</td>
            <td className="px-4 py-4 text-right font-semibold text-ocean">
              {formatCurrency(order.total)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
