"use client";

import useAuth from "@/hooks/use-auth";
import { formatRupiah } from "@/utils/format-rupiah";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Plus } from "lucide-react";
import React from "react";
import WasteForm from "./_components/waste-form";
import { useSetorSampah } from "./_hooks/_mutations/use-setor-sampah";
import { useGetStoredWaste } from "./_hooks/_queries/use-stored-waste";

const WasteBankDashboard: React.FC = () => {
  const { user, isLoading: authPending, isAuthenticated } = useAuth();

  const {
    data: storedWaste,
    isLoading,
    isError,
    error,
  } = useGetStoredWaste(user?.authUserID as string);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const setorSampahMutation = useSetorSampah();

  if (isError) {
    return <p>{error.message}</p>;
  }
  const handleAddWaste = () => {
    onOpen();
  };

  if (authPending) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  return (
    <div className="container px-8 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold sm:mb-4 sm:text-3xl">Your Stored Waste</h1>
        <Button
          onClick={handleAddWaste}
          size="md"
          className="bg-highland-400 text-white transition-all hover:bg-highland-500"
        >
          Setor Sampah
          <span>
            <Plus color="white" size={20} />
          </span>
        </Button>
        <div className="mt-14 px-4">
          Your current balance:&nbsp;
          {formatRupiah(storedWaste?.reduce((acc, cur) => acc + cur.harga_setor, 0) ?? 0)}
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="Waste Bank" className="min-w-full bg-white">
          <TableHeader className="bg-gray-100">
            <TableColumn className="border-b px-4 py-2 text-left">Quantity</TableColumn>
            <TableColumn className="border-b px-4 py-2 text-left">Rincian Sampah</TableColumn>
            <TableColumn className="border-b px-4 py-2 text-left">Harga Setor</TableColumn>
            <TableColumn className="border-b px-4 py-2 text-left">Jenis Sampah</TableColumn>
            <TableColumn className="border-b px-4 py-2 text-left">Disetor Tanggal</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? (
                <div className="animate-pulse">
                  <div className="mb-6 mt-3 h-4 rounded bg-gray-200" />
                  <div className="mb-6 h-4 rounded bg-gray-300" />
                  <div className="mb-6 h-4 rounded bg-gray-200" />
                  <div className="mb-6 h-4 rounded bg-gray-300" />
                  <div className="mb-6 h-4 rounded bg-gray-200" />
                </div>
              ) : (
                "No rows to display"
              )
            }
          >
            {(storedWaste ?? []).map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="border-b px-4 py-2">{entry.qty}</TableCell>
                <TableCell className="border-b px-4 py-2">{entry.rincian_sampah}</TableCell>
                <TableCell className="border-b px-4 py-2">{entry.harga_setor}</TableCell>
                <TableCell className="border-b px-4 py-2">{entry.jenis_sampah}</TableCell>
                <TableCell className="border-b px-4 py-2">
                  {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="mb-6 text-2xl font-bold">Waste Form</h2>
              </ModalHeader>
              <ModalBody>
                <WasteForm
                  mutation={setorSampahMutation}
                  onClose={onClose}
                  user_id={user?.authUserID ?? ""}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WasteBankDashboard;
