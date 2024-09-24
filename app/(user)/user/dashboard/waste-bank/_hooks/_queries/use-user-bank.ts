import { useQuery } from "@tanstack/react-query";
import { getUserBank } from "../../_api/waste-bank";

export const useGetUserBank = (userId: string) => {
  return useQuery({
    queryKey: ["user-bank", userId],
    queryFn: () => getUserBank(userId),
  });
};
