import { useQuery } from "@tanstack/react-query";
import { getStoredWaste } from "../../_api/waste-bank";

export const useGetStoredWaste = (userId: string) => {
  return useQuery({
    queryKey: ["stored-waste"],
    queryFn: () => getStoredWaste(userId),
  });
};
