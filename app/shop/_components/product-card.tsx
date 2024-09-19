"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { formatRupiah } from "@/utils/format-rupiah";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: string;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard(props: ProductCardProps) {
  const { title, image, price, id } = props;
  const router = useRouter();

  function handleClick() {
    router.push(`/shop/${id}`);
  }

  return (
    <li onClick={handleClick}>
      <Link href="/" className="group block overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
        <div className="relative bg-white pt-3">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {title}
          </h3>
          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>
            <span className="tracking-wider text-gray-900">{formatRupiah(price)}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
