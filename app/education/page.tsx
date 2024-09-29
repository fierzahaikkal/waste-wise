import EduHero from "./_components/hero";
import WasteTypes from "./_components/waste-types";
import HowItWorks from "./_components/how-it-works";
import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import CtaWorks from "./_components/cta-how-to-works";
import EducationArticle from "./_components/education-article";

const EduPage = () => {
  return (
    <section className="w-full">
      <div className="min-h-screen bg-[url('/bg-edu-hero.png')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <EduHero />
      </div>
      <div className="mt-[80px] flex flex-col gap-y-[80px]">
        <WasteTypes />
        <CtaWorks />
        <HowItWorks />
        <EducationArticle />
        <Footer />
      </div>
    </section>
  );
};

export default EduPage;
