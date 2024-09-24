import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";

const supabase = createSupabaseClientWithTypes();

export async function getUsersWaste() {
  // Fetch all users' stored waste data by joining setor with users and jenis_sampah
  const { data: setorData, error: setorError } = await supabase.from("setor").select(`
      *,
      jenis_sampah:jenis_sampah(nama, harga_per_kg),
      users:users(fk_user_id, email)
    `);

  if (setorError) {
    throw new Error(getErrorMessage(setorError));
  }

  return setorData;
}
