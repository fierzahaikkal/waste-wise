import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";

const supabase = createSupabaseClient();

type OrdersResponse = {
  id: string;
  id_order: string;
  fk_id_user: string;
  fk_id_product: string;
  status_order: "pending" | "delivered" | "shipped";
  status_payment: string;
  amount: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
};

export async function getOrders(): Promise<OrdersResponse[]> {
  try {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) {
      throw new Error(getErrorMessage(error));
    }
    return data as unknown as OrdersResponse[];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
