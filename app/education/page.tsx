import EduHero from "./_components/hero";
import WasteTypes from "./_components/waste-types";
import HowItWorks from "./_components/how-it-works";
import { WasteCards } from "./_components/bento-waste";
import Footer from "@/components/footer";
import Navbar from "./_components/navbar";

const EduPage = () => {
  return (
    <section className="w-full">
      <div className="min-h-screen bg-[url('/bg-edu-hero.png')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <EduHero />
      </div>
      <div className="container mx-auto mb-[80px]">
        <WasteTypes />
        <HowItWorks />
        <WasteCards />
      </div>
      <Footer />
    </section>
  );
};

export default EduPage;
