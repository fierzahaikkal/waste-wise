"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { UseMutationResult } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { WasteFormPayload } from "../_api/waste-bank";
import { useGetJenisSampah } from "../_hooks/_queries/use-jenis-sampah";

type WasteFormProps = {
  onClose: () => void;
  user_id: string;
  mutation: UseMutationResult<
    {
      success: boolean;
      message: string;
    },
    Error,
    WasteFormPayload,
    unknown
  >;
};

const WasteForm = (props: WasteFormProps) => {
  const { data, isLoading, error } = useGetJenisSampah();

  const selectOptionsObj = useMemo(() => {
    return data?.map(jenis => ({
      label: jenis.nama,
      value: jenis.id,
    }));
  }, [data]);

  const { onClose, user_id, mutation } = props;
  const [formData, setFormData] = useState<WasteFormPayload>({
    quantity: 0,
    rincian_sampah: "",
    user_id,
    jenis_sampah_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onError: () => {
        toast.error("Something went wrong... please try again in a few minutes");
      },
      onSettled: () => {
        window.location.href = "/user/dashboard/waste-bank";
        setTimeout(() => {
          onClose();
        }, 2000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-4">
      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity (Kg)
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-highland-500 focus:outline-none focus:ring-highland-500 sm:text-sm"
        />
      </div>

      {/* Rincian Sampah */}
      <div>
        <label htmlFor="rincian_sampah" className="block text-sm font-medium text-gray-700">
          Rincian Sampah
        </label>
        <textarea
          name="rincian_sampah"
          id="rincian_sampah"
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-highland-500 focus:outline-none focus:ring-highland-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="img_url" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          name="img_url"
          id="img_url"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-highland-500 focus:outline-none focus:ring-highland-500 sm:text-sm"
        />
      </div>

      {/* Jenis Sampah ID */}
      <div>
        <label htmlFor="jenis_sampah_id" className="block text-sm font-medium text-gray-700">
          Jenis Sampah ID
        </label>
        <Select
          isLoading={isLoading}
          errorMessage={error?.message}
          label="Pilih Jenis Sampah"
          value={formData.jenis_sampah_id}
          onChange={handleChange}
          name="jenis_sampah_id"
        >
          {(selectOptionsObj ?? []).map(opt => (
            <SelectItem key={opt.value}>{opt.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-highland-600 px-4 py-2 text-white shadow hover:bg-highland-600 focus:outline-none focus:ring-2 focus:ring-highland-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default WasteForm;
