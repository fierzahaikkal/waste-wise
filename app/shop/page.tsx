/* eslint-disable @typescript-eslint/no-explicit-any */
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import ProductCard from "./_components/product-card";
import { SupabaseClient } from "@supabase/supabase-js";

async function getProducts(supabase: SupabaseClient<any, "public", any>) {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      return { products: null, error: getErrorMessage(error) };
    }
    return { products: data, error: null };
  } catch (error) {
    const errMsg = getErrorMessage(error);
    return { products: null, error: errMsg };
  }
}

const ShopPage = async () => {
  const supabase = createSupabaseServerClient();
  const { products, error } = await getProducts(supabase);
  if (error || products == null) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="w-full p-12">
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Our Products</h2>
          <p className="mt-4 max-w-md text-gray-500">
            Discover our wide range of recycled products.
          </p>
        </header>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.img_url}
              price={product.price}
              stock={product.quantity}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopPage;
