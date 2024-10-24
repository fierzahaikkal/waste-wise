/* eslint-disable no-use-before-define */

"use client";

import useAuth from "@/hooks/use-auth";
import { formatRupiah } from "@/utils/format-rupiah";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const supabase = createSupabaseClientWithTypes();

export default function WithdrawPage() {
  const [amount, setAmount] = useState<string>("");
  const [usersBalance, setUsersBalance] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<
    { amount: number; status: string; created_at: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        fetchUserTransactions(user.authUserID as string);
        fetchUsersBalance();
      }
    };
    fetchUser();
  }, [user]);

  const fetchUsersBalance = async () => {
    if (!user?.authUserID) {
      throw new Error("User ID is undefined");
    }
    try {
      const { data, error } = await supabase
        .from("users")
        .select("tabungan")
        .eq("fk_user_id", user?.authUserID);
      if (error) throw error;
      setUsersBalance(data[0].tabungan ?? 0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchUserTransactions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("transaction")
        .select("amount, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const cleanedData = data.map(transaction => ({
          amount: transaction.amount ?? 0,
          status: transaction.status ?? "unknown",
          created_at: transaction.created_at ?? new Date().toISOString(),
        }));
        setTransactions(cleanedData);
      }
    } catch (error) {
      setErrorMessage(`Failed to fetch transactions: ${getErrorMessage(error)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (!user?.authUserID) {
      setErrorMessage("You must be logged in to request a withdrawal.");
      return;
    }

    try {
      const { error } = await supabase.from("transaction").insert([
        {
          user_id: user?.authUserID,
          amount: parseFloat(amount),
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSuccessMessage("Withdrawal request submitted successfully!");
      setAmount("");
      fetchUserTransactions(user?.authUserID);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(`Failed to submit withdrawal request: ${getErrorMessage(error)}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
          <p className="text-gray-600">Your balance: {formatRupiah(usersBalance)}</p>
          <Button
            onPress={() => setIsModalOpen(true)}
            className="bg-[#749567] text-white hover:bg-[#5a7450]"
            size="md"
          >
            New Withdrawal Request
          </Button>
        </div>
        <Table aria-label="Withdrawal transactions table" className="min-w-full">
          <TableHeader>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>DATE</TableColumn>
          </TableHeader>
          <TableBody emptyContent="You have no withdrawal requests." items={transactions}>
            {item => (
              <TableRow key={item.created_at}>
                <TableCell>
                  <span className="font-medium">
                    {formatRupiah(Number(item.amount.toFixed(2)))}
                  </span>
                </TableCell>
                <TableCell>
                  <Chip size="sm" color={getStatusColor(item.status)} variant="flat">
                    {item.status.toUpperCase()}
                  </Chip>
                </TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMessage(null);
          setSuccessMessage(null);
        }}
        size="md"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Withdraw Money</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount to withdraw"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    variant="bordered"
                    step="0.01"
                    min="0"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">$</span>
                      </div>
                    }
                  />
                  {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
                  {successMessage && <p className="text-sm text-success">{successMessage}</p>}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-[#749567] text-white hover:bg-[#5a7450]"
                  onClick={handleSubmit}
                >
                  Submit Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
