import { AuthContextProvider } from "@/components/contexts/auth-context";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthContextProvider>
  );
};

export default ShopLayout;
