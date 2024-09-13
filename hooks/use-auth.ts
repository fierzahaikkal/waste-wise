import { AuthContext } from "@/components/contexts/auth-context";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return auth;
};

export default useAuth;
