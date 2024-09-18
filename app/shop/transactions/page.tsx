"use client";

import { useEffect } from "react";

const usernamePassword = `${process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY_DEV}:`;
const AUTH_STRING = btoa(usernamePassword); // convert to base64
const getPaymentLinkDetails = "https://api.sandbox.midtrans.com/v1/payment-links/barang-bekas-04"; // pake ini

const TransactionsPage = () => {
  useEffect(() => {
    async function getPaymentStatus() {
      try {
        const res = await fetch(getPaymentLinkDetails, {
          method: "GET",
          headers: {
            Accept: "application/json",
            authorization: `Basic ${AUTH_STRING}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getPaymentStatus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold">Your Transactions</h1>
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Order Summary</h2>

        <div className="mb-4">
          <p className="text-gray-600">
            <strong>Order ID:</strong> order id
          </p>
          <p className="text-gray-600">
            <strong>Transaction Time:</strong> 00.00
          </p>
          <p className="text-gray-600">
            <strong>Payment Type:</strong> credit card
          </p>
        </div>

        <div className="mb-4 mt-4 border-t border-gray-200" />

        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold">Payment Status</h3>
          <p className={`text-lg text-green-300`}>payment sucessful</p>

          <div className="mt-4 h-4 w-full rounded-full bg-gray-200">
            <div className={`h-4 rounded-full`} />
          </div>
        </div>

        <div className="mb-4 mt-4 border-t border-gray-200" />

        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Total: </p>
          <p className="text-xl font-bold text-gray-800">Rp 100000</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
