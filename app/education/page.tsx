import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import EduHero from "./_components/hero";
import NavBar from "./_components/navbar";
import WasteTypes from "./_components/waste-types";

const EduPage = () => {
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
    <section className="w-full">
      <div className="min-h-screen bg-[url('/bg-edu-hero.png')] bg-cover bg-center bg-no-repeat">
        <NavBar isSupabaseConnected={isSupabaseConnected} />
        <EduHero />
      </div>
      <WasteTypes />
    </section>
  );
};

export default EduPage;
