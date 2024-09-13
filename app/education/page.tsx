import EduHero from "./_components/hero";
import Navbar from "./_components/navbar";
import WasteTypes from "./_components/waste-types";

const EduPage = () => {
  return (
    <section className="w-full">
      <div className="min-h-screen bg-[url('/bg-edu-hero.png')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <EduHero />
      </div>
      <WasteTypes />
    </section>
  );
};

export default EduPage;
