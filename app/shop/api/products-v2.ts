/* eslint-disable @typescript-eslint/no-explicit-any */
import apiResolver from "@/api/api-resolver";
import { AUTH_STRING } from "@/lib/midtrans";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import Axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_PAYMENT_LINKS_URL_DEV;
const axios = Axios.create({
  baseURL,
});
const supabase = createSupabaseClientWithTypes();

export type OrdersResponse = {
  img_url: string;
  product_name: string;
  gross_amount: number;
  order_id: string;
  date: string;
  order_status: string;
  product_desc: string;
  product_id: string;
};

export type CreatePaymentLinkPayload = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  img_url: string;
  id_order: string;
};

export type CreateOrder = {
  id_order: string;
  fk_id_user: string;
  fk_id_product: string;
  amount: number;
  quantity: number;
  price: number;
};

export async function createPaymentLink(data: CreatePaymentLinkPayload) {
  return apiResolver(() =>
    axios.post(
      "",
      {
        transaction_details: {
          order_id: data.id_order,
          gross_amount: Number(data.price) * Number(data.quantity),
        },
        usage_limit: 2,
        item_details: [
          {
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
          },
        ],
        // customer_details: {
        //   first_name: "John",
        //   last_name: "Doe",
        //   email: "john.doe@midtrans.com",
        //   phone: "+62181000000000",
        //   notes: "Thank you for your purchase. Please follow the instructions to pay.",
        // },
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${AUTH_STRING}`,
        },
      }
    )
  );
}

export async function createCustomerOrder(payload: CreateOrder) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        id_order: payload.id_order,
        fk_id_user: payload.fk_id_user,
        fk_id_product: payload.fk_id_product,
        status_order: "pending",
        status_payment: "pending",
        amount: payload.amount,
        quantity: payload.quantity,
        price: payload.price,
      })
      .select();
    if (error) {
      throw new Error(getErrorMessage(error));
    }
    return {
      message: "Order created successfully",
      data,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getOrders(userId: string): Promise<OrdersResponse[]> {
  try {
    // Get user's orders
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("fk_id_user", userId);

    if (orderError) {
      throw new Error(getErrorMessage(orderError));
    }

    if (!orderData || orderData.length === 0) {
      return [];
    }

    // Extract product IDs from the orders
    const productIds = orderData.map(order => order.fk_id_product);

    // Fetch all product data in one query
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      throw new Error(getErrorMessage(productError));
    }

    if (!productData || productData.length === 0) {
      return [];
    }

    // Combine order data and product data into OrdersResponse[]
    const ordersResponse: OrdersResponse[] = orderData.map(order => {
      const product = productData.find(p => p.id === order.fk_id_product);

      if (!product) {
        throw new Error("Product not found for order");
      }

      return {
        img_url: product.img_url || "",
        product_name: product.name || "Unknown product",
        gross_amount: order.amount || 0,
        order_id: order.id_order || "Unknown order ID",
        date: order.created_at || "",
        order_status: order.status_order || "Unknown status",
        product_desc: product.desc || "No description available",
        product_id: product.id || "Unknown product ID",
      };
    });

    return ordersResponse;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
