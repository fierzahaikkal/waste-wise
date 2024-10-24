"use client";

import { formatRupiah } from "@/utils/format-rupiah";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import {
  Chip,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const supabase = createSupabaseClientWithTypes();

const STATUS_OPTIONS = [
  { value: "pending", label: "PENDING" },
  { value: "transferred", label: "TRANSFERRED" },
  { value: "rejected", label: "REJECTED" },
];

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  users: {
    fullname: string;
    bank: string;
    account_number: string;
  };
}

const AdminWithdrawalsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("transaction")
          .select(
            `
            id,
            user_id,
            amount,
            status,
            created_at,
            users (
              fullname,
              bank,
              account_number
            )
          `
          )
          .neq("status", "rejected")
          .order("created_at", { ascending: false });

        if (error) throw error;
        const validData = (data ?? []).filter(
          transaction =>
            transaction.user_id !== null &&
            transaction.amount !== null &&
            transaction.status !== null &&
            transaction.users !== null
        ) as unknown as Transaction[];
        setTransactions(validData);
      } catch (error) {
        setErrorMessage(`Failed to fetch transactions: ${getErrorMessage(error)}`);
      }
    };

    fetchTransactions();
  }, []);

  const handleStatusChange = async (
    transactionId: string,
    userId: string,
    newStatus: string,
    amount: number
  ) => {
    setIsLoading(prev => ({ ...prev, [transactionId]: true }));
    try {
      const { error: updateError } = await supabase
        .from("transaction")
        .update({ status: newStatus })
        .eq("id", transactionId);

      if (updateError) throw updateError;

      if (newStatus === "transferred") {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("tabungan")
          .eq("fk_user_id", userId)
          .single();

        if (userError) throw userError;

        const newTabungan = (user.tabungan ?? 0) - amount;

        const { error: updateUserError } = await supabase
          .from("users")
          .update({ tabungan: newTabungan })
          .eq("fk_user_id", userId);

        if (updateUserError) throw updateUserError;
      }

      setTransactions(prev =>
        prev.map(transaction =>
          transaction.id === transactionId ? { ...transaction, status: newStatus } : transaction
        )
      );
    } catch (error) {
      setErrorMessage(`Failed to update status: ${getErrorMessage(error)}`);
    } finally {
      setIsLoading(prev => ({ ...prev, [transactionId]: false }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "transferred":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-lg bg-white">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Customers Withdrawal Requests</h1>
        </div>
        <div className="p-4">
          {errorMessage && <p className="mb-4 text-sm text-danger">{errorMessage}</p>}
          <Table aria-label="Withdrawal transactions table" className="min-w-full" removeWrapper>
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>BANK DETAILS</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No withdrawal requests" items={transactions}>
              {item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.users.fullname}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.users.bank}</span>
                      <span className="text-sm text-gray-500">{item.users.account_number}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {formatRupiah(Number(item.amount.toFixed(2)))}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="sm"
                      selectedKeys={[item.status]}
                      onChange={e => {
                        const newStatus = e.target.value;
                        handleStatusChange(item.id, item.user_id, newStatus, item.amount);
                      }}
                      isLoading={isLoading[item.id]}
                      className="max-w-xs"
                      labelPlacement="outside"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          startContent={
                            <Chip size="sm" color={getStatusColor(status.value)} variant="flat">
                              {status.label}
                            </Chip>
                          }
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalsPage;
