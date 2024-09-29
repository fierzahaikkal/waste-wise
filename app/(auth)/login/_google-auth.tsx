"use client";

import { createSupabaseClientWithTypes } from "@/utils/supabase/client";

const supabase = createSupabaseClientWithTypes();

const GoogleAuthButton = () => {
  return (
    <button
      className="flex w-full max-w-xs items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: "google",
        });
      }}
    >
      <img
        className="mr-3 h-5 w-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
        alt="Google logo"
      />
      Sign In with Google
    </button>
  );
};

export default GoogleAuthButton;
