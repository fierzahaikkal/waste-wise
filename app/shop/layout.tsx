import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ShopLayout;
