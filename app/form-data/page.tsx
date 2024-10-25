"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/utils/supabase/types";
import { createSupabaseClient } from "@/utils/supabase/client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { Sprout } from "lucide-react";

export type UserDetails = Database["public"]["Tables"]["users"]["Row"];

const BANK_OPTIONS = [
  { value: "BNI", label: "BNI" },
  { value: "BCA", label: "BCA" },
  { value: "Mandiri", label: "Mandiri" },
  { value: "BRI", label: "BRI" },
  { value: "DKI", label: "DKI" },
  { value: "BSI", label: "BSI" },
] as const;

export type BankType = (typeof BANK_OPTIONS)[number]["value"];

type UserForm = {
  fullname: string;
  alamat: string;
  account_number: number;
  bank: BankType | null;
};

export default function UserDataForm() {
  const supabase = createSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [bankError, setBankError] = useState<{ message: string } | null>(null);
  const [formData, setFormData] = useState<UserForm>({
    fullname: "",
    alamat: "",
    account_number: 0,
    bank: null,
  });
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.push("/login"); // Redirect to login if no user
          return;
        }

        setUser(user);
        // Fetch existing user details
        const { data: userDetails, error: dbError } = await supabase
          .from("users")
          .select("fullname, alamat, account_number, bank")
          .eq("fk_user_id", user.id)
          .single<UserForm>();

        if (dbError && dbError.code !== "PGRST116") {
          // Ignore "not found" error
          throw dbError;
        }

        // If user details exist, populate the form
        if (userDetails) {
          if (
            userDetails.account_number &&
            userDetails.alamat &&
            userDetails.bank &&
            userDetails.fullname !== null
          ) {
            router.push("/");
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing user:", error);
        router.push("/login");
      }
    };

    initializeUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isInitialized) return;

    setLoading(true);
    try {
      // First, check if user record exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("fk_user_id", user.id)
        .single();

      let error;
      if (existingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from("users")
          .update({
            fullname: formData.fullname,
            alamat: formData.alamat,
            account_number: formData.account_number,
            bank: formData.bank,
          })
          .eq("fk_user_id", user.id);
        error = updateError;
      } else {
        // Insert new user
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          fullname: formData.fullname,
          alamat: formData.alamat,
          account_number: formData.account_number,
          bank: formData.bank,
        });
        error = insertError;
      }

      if (error) throw error;

      router.push("/");
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error appropriately (show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setBankError(null);
    setFormData(prev => ({
      ...prev,
      bank: value as BankType,
    }));
  };

  // Add specific handler for account number
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Only allow digits
    if (value === "" || /^\d+$/.test(value)) {
      handleInputChange("account_number", value);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1557344229-dd030deb6731?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-highland-600" href="/">
              <span className="sr-only">Home</span>
              <Sprout className="h-8 w-10 sm:h-10" />
            </a>
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Hi Yuk Lengkapi Dulu!
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Mari lengkapi akun mu dan menjadi bagian dari agent of change!
            </p>
            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Input
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

              <div className="col-span-6">
                <Textarea
                  isRequired
                  variant="bordered"
                  description="Tulis alamat lengkap kamu yah!"
                  name="alamat"
                  type="text"
                  label="Alamat"
                  maxLength={150}
                  inputMode="text"
                  className="w-full"
                  id="alamat"
                  placeholder="Enter your address"
                  value={formData.alamat ?? ""}
                  onChange={e => handleInputChange("alamat", e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
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

              <div className="col-span-3">
                <label htmlFor="account_number">Masukkan Nomor Rekening</label>
                <input
                  id="account_number"
                  type="number"
                  inputMode="numeric" // Shows numeric keyboard on mobile
                  pattern="\d*" // Allows only digits
                  className="mt-3 rounded-xl bg-gray-100 p-4"
                  placeholder="Enter your account number"
                  value={formData.account_number ?? 0}
                  onChange={handleAccountNumberChange}
                  required
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="inline-block shrink-0 items-center rounded-md border border-highland-600 bg-highland-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-highland-600 focus:outline-none focus:ring active:text-highland-500"
                >
                  {loading ? "Saving..." : "Save Details"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
