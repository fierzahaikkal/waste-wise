import { useQuery } from "@tanstack/react-query";
import { getJenisSampah } from "../../_api/waste-bank";

export const useGetJenisSampah = () => {
  return useQuery({
    queryKey: ["jenis-sampah"],
    queryFn: getJenisSampah,
  });
};
