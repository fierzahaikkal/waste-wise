/* eslint-disable @typescript-eslint/no-explicit-any */
import apiResolver from "@/api/api-resolver";
import { AUTH_STRING } from "@/lib/midtrans";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";
import Axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_PAYMENT_LINKS_URL_DEV;
const axios = Axios.create({
  baseURL,
});
const supabase = createSupabaseClient();

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
