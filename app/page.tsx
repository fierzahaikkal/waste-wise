import Footer from "@/components/footer";
import Hero from "@/app/_components/hero";
import Services from "@/app/_components/services";
import Navbar from "@/components/navbar";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createSupabaseServerClient();
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(getErrorMessage(e));
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <section>
      <Navbar isSupabaseConnected={isSupabaseConnected} />
      <Hero />
      <Services />
      <Footer />
    </section>
  );
}
