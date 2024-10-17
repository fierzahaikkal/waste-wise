"use client";

/* eslint-disable react/jsx-no-bind */
import useAuth from "@/hooks/use-auth";
import { formatRupiah } from "@/utils/format-rupiah";
import { Button } from "@nextui-org/button";
import { nanoid } from "nanoid";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreateOrder } from "../hooks/use-create-order";
import { useCreatePaymentLink } from "../hooks/use-payment-link";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";

export type ProductDetailProps = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  img_url: string;
};

const supabaseClient = createSupabaseClientWithTypes();

const ProductDetail = (props: ProductDetailProps) => {
  const { desc, name: productName, price, img_url, quantity: stock, id: productId } = props;
  const paymentLinkMutation = useCreatePaymentLink();
  const createOrderMutation = useCreateOrder();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read the initial quantity from searchParams or default to 1
  const initialQuantity = Number(searchParams.get("quantity")) || 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [grossAmount, setGrossAmount] = useState(price * quantity);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("quantity", quantity.toString());
    router.push(`${pathname}?${params.toString()}`);
    setGrossAmount(price * quantity);
  }, [quantity, searchParams, router, pathname, price]);

  function handlePayment() {
    createOrderMutation.mutate(
      {
        id_order: `${productName.replaceAll(" ", "-").toLowerCase()}-${nanoid(7)}`,
        fk_id_user: user?.authUserID as string,
        fk_id_product: productId,
        amount: grossAmount,
        price,
        quantity,
      },
      {
        onSuccess: data => {
          paymentLinkMutation.mutate(
            {
              ...props,
              quantity,
              id_order: data.data[0].id_order,
            },
            {
              async onSuccess(data) {
                await supabaseClient
                  .from("products")
                  .update({ quantity: stock - quantity })
                  .eq("id", productId);
                router.replace(data?.payment_url);
              },
              onError(error) {
                toast.error(getErrorMessage(error));
              },
            }
          );
        },
        onError: error => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  }

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mx-auto flex flex-wrap lg:w-4/5">
      <Image
        width={500}
        height={500}
        alt="ecommerce"
        className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
        src={img_url}
      />
      <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
        <h2 className="title-font text-sm tracking-widest text-gray-500">WASTE WISE</h2>
        <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">{productName}</h1>
        <p className="mb-10 font-light">stock: {stock}</p>
        <p className="leading-relaxed">{desc}</p>
        <div className="mt-10 flex md:mt-20">
          <div className="flex flex-col items-start justify-center gap-y-4">
            <span className="title-font text-2xl font-medium text-gray-900">
              {formatRupiah(grossAmount)}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={decrementQuantity}
                className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-900">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            className="ml-auto flex rounded border-0 bg-highland-500 px-6 py-2 text-white hover:bg-highland-600 focus:outline-none"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
