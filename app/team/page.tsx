import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TeamSection from "./_team";

export default async function TeamPage() {
  return (
    <section>
      <Navbar />
      <TeamSection />
      <Footer />
    </section>
  );
}
