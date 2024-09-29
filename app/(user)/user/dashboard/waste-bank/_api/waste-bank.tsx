import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";

const supabase = createSupabaseClientWithTypes();

export type SetorResponse = {
  id: string;
  qty: number;
  rincian_sampah: string;
  harga_setor: number;
  jenis_sampah: string;
  created_at: number;
};

export type WasteFormPayload = {
  quantity: number;
  rincian_sampah: string;
  user_id: string;
  jenis_sampah_id: string;
  img_url: string;
};

export const getStoredWaste = async (userId: string) => {
  try {
    const { data: setorData, error } = await supabase
      .from("setor")
      .select(
        `
        *,
        jenis_sampah:jenis_sampah(nama, harga_per_kg)
      `
      )
      .eq("fk_id_cust", userId);

    if (error) {
      throw new Error(getErrorMessage(error));
    }

    const response: SetorResponse[] = setorData.map(setor => ({
      id: setor.id,
      qty: setor.quantity || 0,
      rincian_sampah: setor.rincian_sampah || "",
      harga_setor: setor.harga_setor || 0,
      jenis_sampah: setor.jenis_sampah?.nama || "",
      created_at: setor.created_at as number,
    }));

    return response;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export async function getJenisSampah() {
  try {
    const { data, error } = await supabase.from("jenis_sampah").select("*");

    if (error) {
      throw new Error(getErrorMessage(error));
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function setorSampah(data: WasteFormPayload) {
  if (!data.user_id)
    return {
      success: false,
      message: "please provide user_id",
    };

  try {
    const { error } = await supabase.from("setor").insert({
      quantity: data.quantity,
      rincian_sampah: data.rincian_sampah,
      fk_id_cust: data.user_id,
      id_jenis_sampah: data.jenis_sampah_id,
    });
    if (error) {
      throw new Error(getErrorMessage(error));
    }
    return {
      success: true,
      message: "setor sampah berhasil",
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getUserBank(userId: string) {
  if (!userId) return null;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("tabungan")
      .eq("fk_user_id", userId);

    if (error) {
      throw new Error(getErrorMessage(error));
    }

    return data[0].tabungan;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
