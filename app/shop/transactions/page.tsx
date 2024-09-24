"use client";

import useAuth from "@/hooks/use-auth";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import { useGetOrders } from "../hooks/use-get-orders";
import { formatRupiah } from "@/utils/format-rupiah";

export default function OrderHistory() {
  const { user } = useAuth();
  const { data: orders } = useGetOrders(user?.authUserID as string);

  return (
    <div className="container mx-auto grid place-content-center px-10 py-16">
      <h1 className="mb-4 text-3xl font-semibold">Order history</h1>
      <p className="mb-6 text-gray-500">
        Check the status of recent and old orders & discover more products
      </p>
      {orders?.map(order => (
        <div key={order.order_id} className="mb-8 pb-6">
          <div className="mb-4 flex justify-between">
            {/* Order details */}
            <div className="flex flex-col items-start gap-x-6 space-x-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-x-1">
                <p className="text-gray-500">Order ID:</p>
                <p className="font-bold">{order.order_id}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-gray-500">Date:</p>
                <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-gray-500">Order Status:</p>
                <p
                  className={`font-light ${
                    order.order_status === "Delivered" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {order.order_status}
                </p>
              </div>
            </div>
          </div>
          <Divider className="mb-10 mt-5" />
          <div className="mb-4 flex items-start justify-between gap-x-4">
            {/* Product image */}
            <div className="relative h-56 w-56">
              <Image
                fill
                src={order.img_url}
                alt={order.product_name}
                className="absolute h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="flex h-full flex-col justify-between gap-y-4">
              {/* Product name and description */}
              <div>
                <h3 className="text-lg font-medium">{order.product_name}</h3>
                <p className="line-clamp-2 max-w-[80ch] text-sm text-gray-500">
                  {order.product_desc}
                </p>
              </div>
              <p className="text-sm text-gray-700">{formatRupiah(order.gross_amount)}</p>
            </div>
            <div className="text-right">
              <button className="mr-4 text-gray-500 transition-all hover:text-gray-600">
                View Product
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
