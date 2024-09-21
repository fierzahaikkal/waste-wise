import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/products-v2";

export const useGetOrders = (userId: string) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
  });
};
