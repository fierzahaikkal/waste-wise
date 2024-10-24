"use client";

// Modal component
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/utils/supabase/types";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import { Button, Modal, ModalContent, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
// import { User } from "@/components/contexts/auth-context";

// types.ts
export type UserDetails = Database["public"]["Tables"]["users"]["Row"];

// Create a typed Supabase client
export const supabase = createSupabaseClientWithTypes();

export const BANK_OPTIONS = [
  { value: "BNI", label: "BNI" },
  { value: "BCA", label: "BCA" },
  { value: "Mandiri", label: "Mandiri" },
  { value: "BRI", label: "BRI" },
  { value: "DKI", label: "DKI" },
] as const;
export type BankType = (typeof BANK_OPTIONS)[number]["value"];

interface ModalUserFormProps {
  user: User | null;
}

export default function ModalUserForm({ user }: ModalUserFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bankError, setBankError] = useState<{ message: string } | null>(null);
  const [formData, setFormData] = useState<
    Pick<
      Database["public"]["Tables"]["users"]["Update"],
      "fullname" | "alamat" | "account_number" | "bank"
    >
  >({
    fullname: "",
    alamat: "",
    account_number: 0,
    bank: null,
  });
  const router = useRouter();

  useEffect(() => {
    const checkUserDetails = async () => {
      if (!user) return;

      try {
        const { data: userDetails, error } = await supabase
          .from("users")
          .select("fullname, alamat, account_number, bank")
          //   .eq("fk_user_id", user.authUserID)
          .eq("id", user.id)

          .single();

        if (error) throw error;

        // Check if any required fields are empty
        const isIncomplete =
          !userDetails ||
          !userDetails.fullname ||
          !userDetails.alamat ||
          !userDetails.account_number ||
          !userDetails.bank;

        if (isIncomplete) {
          setOpen(true);
        }
      } catch (error) {
        console.error("Error checking user details:", error);
      }
    };

    checkUserDetails();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          fullname: formData.fullname,
          alamat: formData.alamat,
          account_number: formData.account_number,
          bank: formData.bank,
        })
        // .eq("fk_user_id", user.authUserID);
        .eq("id", user.id);

      if (error) throw error;

      setOpen(false);
      router.refresh(); // Refresh the page to update the UI
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "account_number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setBankError(null);
    setFormData(prev => ({
      ...prev,
      bank: value as BankType,
    }));
  };

  return (
    <div>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent className="sm:max-w-[425px]">
          <ModalHeader>
            <h1>Complete Your Profile</h1>
          </ModalHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                placeholder="Enter your full name"
                value={formData.fullname ?? ""}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="alamat">Address</label>
              <input
                id="alamat"
                placeholder="Enter your address"
                value={formData.alamat ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="account_number">Account Number</label>
              <input
                id="account_number"
                type="number"
                placeholder="Enter your account number"
                value={formData.account_number ?? 0}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bank">Bank Name</label>
              <Select
                label="Bank Name"
                isLoading={loading}
                errorMessage={bankError?.message}
                selectedKeys={formData.bank ? [formData.bank] : []}
                onChange={e => handleSelectChange(e.target.value)}
                className="w-full"
              >
                {BANK_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Details"}
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
