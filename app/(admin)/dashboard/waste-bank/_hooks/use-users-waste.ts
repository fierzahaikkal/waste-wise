import { useQuery } from "@tanstack/react-query";
import { getUsersWaste } from "../_api/waste-bank";

export const useUsersWaste = () => {
  return useQuery({
    queryKey: ["users-waste"],
    queryFn: getUsersWaste,
  });
};
