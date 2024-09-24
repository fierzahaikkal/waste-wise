import { useMutation, QueryClient } from "@tanstack/react-query";
import { setorSampah } from "../../_api/waste-bank";

export const useSetorSampah = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: setorSampah,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stored-waste"],
        refetchType: "active",
      });
    },
  });
};
