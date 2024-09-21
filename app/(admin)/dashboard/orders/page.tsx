"use client";

import { useState, useMemo } from "react";
import { useGetCustomerOrders } from "../../_hooks/use-get-customer-orders";
import { createSupabaseClient } from "@/utils/supabase/client";
import { Select, SelectItem } from "@nextui-org/select";
import { formatRupiah } from "@/utils/format-rupiah";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const orderStatuses = ["pending", "delivered", "shipped"] as const;

const supabase = createSupabaseClient();

const CustomersOrderPage = () => {
  const { data: orders, isLoading, isError } = useGetCustomerOrders();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ status_order: newStatus })
      .eq("id", orderId);

    if (error) {
      toast.error(`Error updating status: ${error.message}}`);
    } else {
      router.refresh();
    }
    setUpdatingOrderId(null);
  };

  const sortedOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders].sort((a, b) => {
      const statusOrder = { shipped: 0, pending: 1, delivered: 2 };
      return (
        statusOrder[a.status_order as keyof typeof statusOrder] -
        statusOrder[b.status_order as keyof typeof statusOrder]
      );
    });
  }, [orders]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[80rem] px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Customer Orders</h1>
      <table className="min-w-full overflow-x-scroll bg-white">
        <thead>
          <tr className="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {sortedOrders.map(order => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="whitespace-nowrap px-6 py-3 text-left">
                <span className="font-medium">{order.id_order}</span>
              </td>
              <td className="px-6 py-3 text-left">
                <span>{formatRupiah(order.amount)}</span>
              </td>
              <td className="px-6 py-3 text-left">
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </td>
              <td className="px-6 py-3 text-left">
                <Select
                  color={
                    order.status_order === "pending"
                      ? "warning"
                      : order.status_order === "delivered"
                        ? "success"
                        : "primary"
                  }
                  value={order.status_order}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingOrderId === order.id}
                  defaultSelectedKeys={[order.status_order]}
                >
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersOrderPage;
