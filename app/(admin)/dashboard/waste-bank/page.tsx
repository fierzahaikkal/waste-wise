"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { SquarePen, Trash2 } from "lucide-react";
import { useUsersWaste } from "./_hooks/use-users-waste";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/get-error-msg";
import { useDisclosure } from "@nextui-org/modal";
import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { useGetJenisSampah } from "./_hooks/use-jenis-sampah";
import { Database } from "@/utils/supabase/types";

type Setor = Database["public"]["Tables"]["setor"]["Row"];

type WasteForm = {
  id: string;
  id_jenis_sampah: string;
  quantity: number;
  rincian_sampah: string;
};

export default function AdminWasteManagement() {
  const { data, isLoading } = useUsersWaste();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
    onOpenChange: onUpdateModalOpenChange,
  } = useDisclosure();

  const supabase = createSupabaseClientWithTypes();
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [currentWaste, setCurrentWaste] = useState<WasteForm>({
    id: "",
    id_jenis_sampah: "",
    quantity: 0,
    rincian_sampah: "",
  });

  const {
    data: jenisSampahData,
    isLoading: isLoadingJenisSampah,
    error: jenisSampahError,
  } = useGetJenisSampah();

  const selectOptionsObj = useMemo(() => {
    return jenisSampahData?.map(jenis => ({
      label: jenis.nama,
      value: jenis.id,
    }));
  }, [jenisSampahData]);

  const openUpdateModal = (record: Setor) => {
    setCurrentWaste({
      id: record.id,
      id_jenis_sampah: record.id_jenis_sampah,
      quantity: record.quantity ?? 0,
      rincian_sampah: record.rincian_sampah ?? "",
    });
    onUpdateModalOpen();
  };

  const handleEdit = async () => {
    try {
      if (!currentWaste.id) return;

      const { error } = await supabase
        .from("setor")
        .update({
          id_jenis_sampah: currentWaste.id_jenis_sampah,
          quantity: currentWaste.quantity,
          rincian_sampah: currentWaste.rincian_sampah,
        })
        .eq("id", currentWaste.id);

      if (error) {
        toast.error(`Error updating record: ${getErrorMessage(error)}`);
        return;
      }

      toast.success("Record updated successfully");
      onUpdateModalClose();
      window.location.reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentWaste(prev => ({
      ...prev,
      [name]: name === "quantity" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setCurrentWaste(prev => ({
      ...prev,
      id_jenis_sampah: value,
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("setor").delete().eq("id", id);
      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }
      toast.success("Waste deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Admin Waste Management</h1>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <Table
            className="min-w-full divide-y divide-gray-200"
            isStriped
            aria-label="Stored Waste"
          >
            <TableHeader className="bg-gray-50">
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Username
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Jenis Sampah
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Rincian Sampah
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Berat (kg)
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Harga Setor (IDR)
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tanggal Setor
              </TableColumn>
              <TableColumn className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody
              className="divide-y divide-gray-200 bg-white"
              emptyContent={isLoading ? "Loading..." : "No rows to display"}
            >
              {(data || []).map(record => (
                <TableRow key={record.id}>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record?.users?.email?.split("@")[0]}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record.jenis_sampah?.nama}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record.rincian_sampah}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record.quantity}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record.harga_setor}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {record.created_at ? new Date(record.created_at).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => {
                        setIdToDelete(record.id);
                        onDeleteModalOpen();
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openUpdateModal(record)}
                      className="ml-2 text-slate-600 hover:text-slate-900"
                    >
                      <SquarePen className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        isDismissable
        hideCloseButton={false}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Deletion Confirmation</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this record? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete(idToDelete);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onOpenChange={onUpdateModalOpenChange}
        size="lg"
        isDismissable
        hideCloseButton={false}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Waste Record</ModalHeader>
              <ModalBody className="gap-4">
                <div>
                  <label htmlFor="id_jenis_sampah">Jenis Sampah</label>
                  <Select
                    label="Jenis Sampah"
                    isLoading={isLoadingJenisSampah}
                    errorMessage={jenisSampahError?.message}
                    selectedKeys={
                      currentWaste.id_jenis_sampah ? [currentWaste.id_jenis_sampah] : []
                    }
                    onChange={e => handleSelectChange(e.target.value)}
                    className="w-full"
                  >
                    {(selectOptionsObj ?? []).map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="rincian_sampah">Rincian Sampah</label>
                  <input
                    name="rincian_sampah"
                    value={currentWaste.rincian_sampah || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-highland-500 focus:outline-none focus:ring-highland-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Berat (kg)</label>
                  <input
                    name="quantity"
                    type="number"
                    value={currentWaste.quantity || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-highland-500 focus:outline-none focus:ring-highland-500 sm:text-sm"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Note: Harga Setor will be automatically calculated based on the selected Jenis
                  Sampah and quantity.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleEdit();
                    onClose();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
