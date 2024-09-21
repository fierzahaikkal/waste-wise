"use client";

import useAuth from "@/hooks/use-auth";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import { formatRupiah } from "@/utils/format-rupiah";
import { useGetOrders } from "@/app/shop/hooks/use-get-orders";
import { useMemo } from "react";
import Link from "next/link";

type Status = "pending" | "shipped" | "delivered";

const getStatusColor = (status: Status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";
    case "shipped":
      return "text-blue-600";
    case "delivered":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getStatusPriority = (status: Status) => {
  switch (status.toLowerCase()) {
    case "shipped":
      return 1;
    case "pending":
      return 2;
    case "delivered":
      return 3;
    default:
      return 4;
  }
};

export default function OrderHistory() {
  const { user } = useAuth();
  const { data: orders } = useGetOrders(user?.authUserID as string);

  const sortedOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders].sort(
      (a, b) =>
        getStatusPriority(a.order_status as Status) - getStatusPriority(b.order_status as Status)
    );
  }, [orders]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <h1 className="mb-2 text-2xl font-semibold sm:mb-4 sm:text-3xl">Order history</h1>
      <p className="mb-6 text-sm text-gray-500 sm:mb-8 sm:text-base">
        Check the status of recent and old orders & discover more products
      </p>
      {sortedOrders.map(order => (
        <div key={order.order_id} className="mb-8 pb-6">
          <div className="mb-4 flex flex-col justify-between sm:flex-row">
            {/* Order details */}
            <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:gap-x-6">
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="text-sm font-bold">{order.order_id}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-gray-500">Date:</p>
                <p className="text-sm font-bold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-gray-500">Order Status:</p>
                <p className={`text-sm font-light ${getStatusColor(order.order_status as Status)}`}>
                  {order.order_status}
                </p>
              </div>
            </div>
          </div>
          <Divider className="my-4 sm:my-6" />
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            {/* Product image */}
            <div className="relative h-56 w-full sm:w-56">
              <Image
                fill
                src={order.img_url}
                alt={order.product_name}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-y-4">
              {/* Product name and description */}
              <div>
                <h3 className="text-lg font-medium">{order.product_name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{order.product_desc}</p>
              </div>
              <p className="text-sm text-gray-700">{formatRupiah(order.gross_amount)}</p>
            </div>
            <div className="mt-4 w-full text-right sm:mt-0 sm:w-auto">
              <Link href={`/shop/${order.product_id}`}>View Product</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
