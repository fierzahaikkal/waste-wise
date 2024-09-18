import SectionContainer from "@/components/section-container";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function Hero() {
  return (
    <SectionContainer>
      <div className="-mt-14 flex min-h-screen flex-col items-center justify-center gap-x-36 lg:flex-row">
        <div className="mb-8 lg:mb-0">
          <h1 className="mb-6 w-[14ch] bg-gradient-to-r from-highland-700 via-highland-500 to-highland-300 bg-clip-text text-4xl font-medium text-transparent sm:text-5xl md:text-[80px] md:font-bold">
            Turn Your Waste into Wealth
          </h1>
          <div className="relative pb-8 pt-4 lg:hidden lg:w-1/2">
            <Image src="/hero-img.png" alt="hero-image" width={500} height={500} />
          </div>
          <p className="mb-8 text-lg font-light sm:text-xl">
            Join our waste bank app and start earning rewards for your recycling efforts. Together,
            we can create a cleaner, greener future.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="bg-highland-800 text-white hover:bg-highland-900">
              Get Started
            </Button>
            <Button
              size="lg"
              className="border-green-600 bg-highland-100 hover:bg-green-100 hover:text-green-600"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative hidden md:w-1/2 lg:block">
          <Image src="/hero-img.png" alt="hero-image" width={700} height={700} />
        </div>
      </div>
    </SectionContainer>
  );
}
