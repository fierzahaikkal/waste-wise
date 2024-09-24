"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Trash2 } from "lucide-react";
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
} from "@nextui-org/react";
import { useState } from "react";

export default function AdminWasteManagement() {
  const { data, isLoading } = useUsersWaste();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createSupabaseClientWithTypes();
  const [idToDelete, setIdToDelete] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("setor").delete().eq("id", id);
      if (error) toast.error(getErrorMessage(error));
      window.location.reload();
      toast.success("Waste deleted successfully");
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
                        onOpen();
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
    </div>
  );
}
