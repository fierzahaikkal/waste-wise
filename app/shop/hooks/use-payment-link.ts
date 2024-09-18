"use client";

import { useMutation } from "@tanstack/react-query";
import { createPaymentLink } from "../api/products";

export function useCreatePaymentLink() {
  return useMutation({
    mutationFn: createPaymentLink,
  });
}
