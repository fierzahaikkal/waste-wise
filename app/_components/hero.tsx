import Link from "next/link";
import { BackgroundBeams } from "./bg-beams";

export default function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="mx-auto max-w-lg">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-300 to-yellow-300 opacity-70 blur-2xl" />
            <h1 className="relative text-3xl font-semibold text-gray-800 sm:text-5xl md:text-[80px] md:font-bold lg:text-4xl">
              Gandakan Pendapatanmu dan
              <span className="text-blue-500">
                &nbsp;Kembangkan Komunitas
                <br />
              </span>
              Melalui Sampah
            </h1>
          </div>
          <button className="group relative z-[95] mt-6 p-[3px]">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-300 to-yellow-400" />
            <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent group-hover:text-black">
              <Link href={"/login"}>Ayo Bergabung!</Link>
            </div>
          </button>
        </div>

        <div className="relative z-[95] mt-10 flex justify-center">
          <img
            className="h-[400px] w-full rounded-xl object-cover lg:w-4/5"
            alt=""
            src="https://images.unsplash.com/photo-1606037150583-fb842a55bae7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
}
