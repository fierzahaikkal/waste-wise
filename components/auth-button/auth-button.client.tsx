"use client";

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient as supabaseClient } from "@/utils/supabase/client";
import { cn } from "@nextui-org/react";
import { getErrorMessage } from "@/utils/get-error-msg";
import { toast } from "react-toastify";

type Props = {
  isSecondary?: boolean;
};

export default function AuthButtonClient(props: Props) {
  const { isSecondary } = props;
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = supabaseClient();

  useEffect(() => {
    // Get user on component mount
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return user ? (
    <div className="flex items-center gap-4">
      <button
        onClick={signOut}
        className={cn(
          `group rounded-md border border-gray-950 bg-white px-5 py-3 no-underline hover:border-highland-500`,
          {
            "border-white bg-transparent font-light text-white": isSecondary,
          }
        )}
      >
        <p className="font-normal transition-all group-hover:text-highland-300">Logout</p>
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className={cn(
        `group rounded-md border border-gray-950 bg-white px-5 py-3 no-underline hover:border-highland-500`,
        {
          "border-white bg-transparent font-light text-white": isSecondary,
        }
      )}
    >
      <p className="font-normal transition-all group-hover:text-highland-300">Login</p>
    </Link>
  );
}
