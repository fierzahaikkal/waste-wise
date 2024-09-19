export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          fk_id_bank: string | null;
          fk_id_user: string | null;
          id: string;
          nama: string | null;
        };
        Insert: {
          fk_id_bank?: string | null;
          fk_id_user?: string | null;
          id?: string;
          nama?: string | null;
        };
        Update: {
          fk_id_bank?: string | null;
          fk_id_user?: string | null;
          id?: string;
          nama?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_fk_id_bank_fkey";
            columns: ["fk_id_bank"];
            isOneToOne: false;
            referencedRelation: "bank_sampah";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_fk_id_user_fkey";
            columns: ["fk_id_user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bank_sampah: {
        Row: {
          addr: string | null;
          coor: string | null;
          id: string;
          id_bank: string | null;
          kategori_sampah: string[] | null;
          nama_bank: string | null;
          total_setor: number | null;
        };
        Insert: {
          addr?: string | null;
          coor?: string | null;
          id?: string;
          id_bank?: string | null;
          kategori_sampah?: string[] | null;
          nama_bank?: string | null;
          total_setor?: number | null;
        };
        Update: {
          addr?: string | null;
          coor?: string | null;
          id?: string;
          id_bank?: string | null;
          kategori_sampah?: string[] | null;
          nama_bank?: string | null;
          total_setor?: number | null;
        };
        Relationships: [];
      };
      kualitas_sampah: {
        Row: {
          id: string;
          kualitas: Database["public"]["Enums"]["kualitas"] | null;
        };
        Insert: {
          id?: string;
          kualitas?: Database["public"]["Enums"]["kualitas"] | null;
        };
        Update: {
          id?: string;
          kualitas?: Database["public"]["Enums"]["kualitas"] | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          amount: number | null;
          created_at: string | null;
          fk_id_product: string | null;
          fk_id_user: string | null;
          id: string;
          id_order: string | null;
          price: number | null;
          quantity: number | null;
          status_order: Database["public"]["Enums"]["status_order"] | null;
          status_payment: string | null;
          updated_at: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string | null;
          fk_id_product?: string | null;
          fk_id_user?: string | null;
          id?: string;
          id_order?: string | null;
          price?: number | null;
          quantity?: number | null;
          status_order?: Database["public"]["Enums"]["status_order"] | null;
          status_payment?: string | null;
          updated_at?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string | null;
          fk_id_product?: string | null;
          fk_id_user?: string | null;
          id?: string;
          id_order?: string | null;
          price?: number | null;
          quantity?: number | null;
          status_order?: Database["public"]["Enums"]["status_order"] | null;
          status_payment?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "FK_orders.fk_id_product";
            columns: ["fk_id_product"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_fk_id_user_fkey";
            columns: ["fk_id_user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["fk_user_id"];
          },
        ];
      };
      products: {
        Row: {
          desc: string | null;
          id: string;
          img_url: string | null;
          name: string | null;
          price: number | null;
          quantity: number | null;
        };
        Insert: {
          desc?: string | null;
          id?: string;
          img_url?: string | null;
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
        };
        Update: {
          desc?: string | null;
          id?: string;
          img_url?: string | null;
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
        };
        Relationships: [];
      };
      roles: {
        Row: {
          id: string;
          nama_role: string | null;
        };
        Insert: {
          id?: string;
          nama_role?: string | null;
        };
        Update: {
          id?: string;
          nama_role?: string | null;
        };
        Relationships: [];
      };
      setor: {
        Row: {
          berat_sampah: number | null;
          fk_id_bank: string | null;
          fk_id_cust: string | null;
          fk_kualitas_sampah: string | null;
          fk_status_setor: string | null;
          harga_setor: number | null;
          id: string;
          rincian_sampah: string | null;
        };
        Insert: {
          berat_sampah?: number | null;
          fk_id_bank?: string | null;
          fk_id_cust?: string | null;
          fk_kualitas_sampah?: string | null;
          fk_status_setor?: string | null;
          harga_setor?: number | null;
          id?: string;
          rincian_sampah?: string | null;
        };
        Update: {
          berat_sampah?: number | null;
          fk_id_bank?: string | null;
          fk_id_cust?: string | null;
          fk_kualitas_sampah?: string | null;
          fk_status_setor?: string | null;
          harga_setor?: number | null;
          id?: string;
          rincian_sampah?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "setor_fk_id_bank_fkey";
            columns: ["fk_id_bank"];
            isOneToOne: false;
            referencedRelation: "bank_sampah";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "setor_fk_id_cust_fkey";
            columns: ["fk_id_cust"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "setor_fk_kualitas_sampah_fkey";
            columns: ["fk_kualitas_sampah"];
            isOneToOne: false;
            referencedRelation: "kualitas_sampah";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "setor_fk_status_setor_fkey";
            columns: ["fk_status_setor"];
            isOneToOne: false;
            referencedRelation: "status_setor";
            referencedColumns: ["id"];
          },
        ];
      };
      status_setor: {
        Row: {
          id: string;
          keterangan: Database["public"]["Enums"]["status"];
        };
        Insert: {
          id?: string;
          keterangan: Database["public"]["Enums"]["status"];
        };
        Update: {
          id?: string;
          keterangan?: Database["public"]["Enums"]["status"];
        };
        Relationships: [];
      };
      users: {
        Row: {
          alamat: string | null;
          email: string | null;
          fk_id_role: string | null;
          fk_id_setor: string | null;
          fk_user_id: string | null;
          id: string;
          phone: string | null;
        };
        Insert: {
          alamat?: string | null;
          email?: string | null;
          fk_id_role?: string | null;
          fk_id_setor?: string | null;
          fk_user_id?: string | null;
          id?: string;
          phone?: string | null;
        };
        Update: {
          alamat?: string | null;
          email?: string | null;
          fk_id_role?: string | null;
          fk_id_setor?: string | null;
          fk_user_id?: string | null;
          id?: string;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_fk_id_role_fkey";
            columns: ["fk_id_role"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_fk_id_role_fkey1";
            columns: ["fk_id_role"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_fk_id_setor_fkey";
            columns: ["fk_id_setor"];
            isOneToOne: false;
            referencedRelation: "setor";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_fk_id_setor_fkey1";
            columns: ["fk_id_setor"];
            isOneToOne: false;
            referencedRelation: "setor";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_fk_user_id_fkey";
            columns: ["fk_user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_fk_user_id_fkey1";
            columns: ["fk_user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      kualitas: "buruk" | "bagus";
      status: "pending" | "proses" | "selesai";
      status_order: "pending" | "delivered" | "shipped";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
