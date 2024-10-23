export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          fk_id_user: string | null;
          id: string;
          nama: string | null;
        };
        Insert: {
          fk_id_user?: string | null;
          id?: string;
          nama?: string | null;
        };
        Update: {
          fk_id_user?: string | null;
          id?: string;
          nama?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_fk_id_user_fkey";
            columns: ["fk_id_user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      jenis_sampah: {
        Row: {
          created_at: number | null;
          harga_per_kg: number | null;
          id: string;
          nama: string | null;
          updated_at: number | null;
        };
        Insert: {
          created_at?: number | null;
          harga_per_kg?: number | null;
          id?: string;
          nama?: string | null;
          updated_at?: number | null;
        };
        Update: {
          created_at?: number | null;
          harga_per_kg?: number | null;
          id?: string;
          nama?: string | null;
          updated_at?: number | null;
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
          created_at: number | null;
          fk_id_cust: string | null;
          harga_setor: number | null;
          id: string;
          id_jenis_sampah: string;
          quantity: number | null;
          rincian_sampah: string | null;
          updated_at: number | null;
        };
        Insert: {
          created_at?: number | null;
          fk_id_cust?: string | null;
          harga_setor?: number | null;
          id?: string;
          id_jenis_sampah: string;
          quantity?: number | null;
          rincian_sampah?: string | null;
          updated_at?: number | null;
        };
        Update: {
          created_at?: number | null;
          fk_id_cust?: string | null;
          harga_setor?: number | null;
          id?: string;
          id_jenis_sampah?: string;
          quantity?: number | null;
          rincian_sampah?: string | null;
          updated_at?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "setor_fk_id_cust_fkey";
            columns: ["fk_id_cust"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["fk_user_id"];
          },
          {
            foreignKeyName: "setor_id_jenis_sampah_fkey";
            columns: ["id_jenis_sampah"];
            isOneToOne: false;
            referencedRelation: "jenis_sampah";
            referencedColumns: ["id"];
          },
        ];
      };
      transaction: {
        Row: {
          amount: number | null;
          created_at: string;
          id: string;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          id?: string;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          id?: string;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transaction_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["fk_user_id"];
          },
        ];
      };
      users: {
        Row: {
          account_number: number | null;
          alamat: string | null;
          bank: string | null;
          email: string | null;
          fk_id_role: string | null;
          fk_user_id: string | null;
          fullname: string | null;
          id: string;
          phone: string | null;
          tabungan: number | null;
          usia: number | null;
        };
        Insert: {
          account_number?: number | null;
          alamat?: string | null;
          bank?: string | null;
          email?: string | null;
          fk_id_role?: string | null;
          fk_user_id?: string | null;
          fullname?: string | null;
          id?: string;
          phone?: string | null;
          tabungan?: number | null;
          usia?: number | null;
        };
        Update: {
          account_number?: number | null;
          alamat?: string | null;
          bank?: string | null;
          email?: string | null;
          fk_id_role?: string | null;
          fk_user_id?: string | null;
          fullname?: string | null;
          id?: string;
          phone?: string | null;
          tabungan?: number | null;
          usia?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_fk_id_role_fkey";
            columns: ["fk_id_role"];
            isOneToOne: false;
            referencedRelation: "roles";
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
