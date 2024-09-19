/* eslint-disable @typescript-eslint/no-explicit-any */
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import ProductDetail from "../_components/product-detail";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  img_url: string;
};

async function getProduct(
  id: string,
  supabase: SupabaseClient<any, "public", any>
): Promise<{ product: Product[] | null | any[]; error: string | null | PostgrestError }> {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id);
    if (error) {
      return { product: null, error };
    }
    return { product: data, error: null };
  } catch (error) {
    const errMsg = getErrorMessage(error);
    return { product: null, error: errMsg };
  }
}

const ProductDetailPage = async ({ params }: { params: { product: string } }) => {
  const supabase = createSupabaseServerClient();
  const { product, error } = await getProduct(params.product, supabase);
  if (error || product == null) {
    return <div>Error: {error?.toString().valueOf()}</div>;
  }
  return (
    <section className="body-font overflow-hidden bg-white text-gray-700">
      <div className="container mx-auto px-5 py-24">
        <ProductDetail
          desc={product[0].desc}
          name={product[0].name}
          price={product[0].price}
          quantity={product[0].quantity}
          img_url={product[0].img_url}
          id={product[0].id}
        />
      </div>
    </section>
  );
};

export default ProductDetailPage;
