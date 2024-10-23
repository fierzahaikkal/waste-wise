import Hero from "@/app/_components/hero";
import Services from "@/app/_components/services";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Education from "./_components/education-section";
import Products from "./_components/product-section";
import Faq from "./_components/faq";
import WasteBarChart from "./_components/chart";

export default async function Index() {
  return (
    <section>
      <Navbar />
      <div className="flex flex-col gap-y-[80px]">
        <Hero />
        <WasteBarChart />
        <Services />
        <Products />
        <Education />
        <Faq />
        <Footer />
      </div>
    </section>
  );
}
