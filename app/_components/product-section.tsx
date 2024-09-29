"use client";

import { useEffect, useState } from "react";
import SectionContainer from "@/components/section-container";
import Link from "next/link";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";
import Image from "next/image";
import { ProductDetailProps } from "../shop/_components/product-detail";

const Products = () => {
  const [products, setProducts] = useState<ProductDetailProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createSupabaseClient();
      try {
        const { data, error } = await supabase.from("products").select("*").limit(4); // Fetch the 4 newest products

        if (error) {
          setError(getErrorMessage(error));
        } else {
          setProducts(data || []);
        }
      } catch (error) {
        setError(getErrorMessage(error));
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 2 < products.length ? prevIndex + 2 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 2 >= 0 ? prevIndex - 2 : products.length - 2));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="grid place-content-center rounded-xl bg-highland-100 p-6 sm:p-8">
          <div className="mx-auto max-w-md text-center lg:text-left">
            <header>
              <h2 className="text-xl font-bold text-highland-900 sm:text-3xl">Produk Terbaru</h2>
              <p className="mt-4 text-gray-500">
                Kami menjual produk berkualitas dari bahan daur ulang yang dihasilkan dari
                tangan-tangan ajaib, sebagai upaya untuk mendukung ekonomi sirkular. Yuk beli!
              </p>
            </header>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded border border-highland-900 bg-highland-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
            >
              Ayo Beli!
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 lg:py-8">
          <div id="controls-carousel" className="relative w-full" data-carousel="static">
            <div className="relative overflow-hidden rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                {products.slice(currentIndex, currentIndex + 2).map(product => (
                  /* eslint-disable react/no-array-index-key */
                  <Link href={`/shop/${product.id}`}>
                    <Image
                      width={400}
                      height={400}
                      key={product.id}
                      src={product.img_url}
                      className="block h-56 w-full object-cover md:h-96"
                      alt={product.name}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={handlePrev}
              className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1L1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Sebelumnya</span>
              </span>
            </button>

            <button
              onClick={handleNext}
              className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 9l4-4L1 1"
                  />
                </svg>
                <span className="sr-only">Lanjut</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Products;
