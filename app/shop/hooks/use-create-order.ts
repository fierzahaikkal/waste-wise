"use client";

import { useMutation } from "@tanstack/react-query";
import { createCustomerOrder } from "../api/products";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createCustomerOrder,
  });
}
