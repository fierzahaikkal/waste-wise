import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../_api/orders";

export function useGetCustomerOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
