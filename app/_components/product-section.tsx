"use client";

import { useState } from "react";
import SectionContainer from "@/components/section-container";
import Link from "next/link";

const Products = () => {
  const images = [
    "https://images.unsplash.com/photo-1677753727712-c79ce4c420c1?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1696739696228-eee49592ff07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621846323386-a60faf26f962?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&",
    "https://images.unsplash.com/photo-1500388953054-0d94398c7bf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 2 < images.length ? prevIndex + 2 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 2 >= 0 ? prevIndex - 2 : images.length - 2));
  };

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="grid place-content-center rounded-xl bg-highland-100 p-6 sm:p-8">
          <div className="mx-auto max-w-md text-center lg:text-left">
            <header>
              <h2 className="text-xl font-bold text-highland-900 sm:text-3xl">Recent Products</h2>
              <p className="mt-4 text-gray-500">
                Kami menjual produk berkualitas dari bahan daur ulang yang dihasilkan dari
                tangan-tangan ajaib, sebagai upaya untuk mendukung ekonomi sirkular. Yuk beli!
              </p>
            </header>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded border border-highland-900 bg-highland-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
            >
              Lets Buy
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 lg:py-8">
          <div id="controls-carousel" className="relative w-full" data-carousel="static">
            <div className="relative overflow-hidden rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                {images.slice(currentIndex, currentIndex + 2).map((src, index) => (
                  /* eslint-disable react/no-array-index-key */
                  <img
                    key={index}
                    src={src}
                    className="block h-56 w-full object-cover md:h-96"
                    alt={`Slide ${index}`}
                  />
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
                <span className="sr-only">Previous</span>
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
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Products;
