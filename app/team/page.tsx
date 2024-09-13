import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import TeamSection from "./_team";

export default async function TeamPage() {
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
      <TeamSection />
      <Footer />
    </section>
  );
}
