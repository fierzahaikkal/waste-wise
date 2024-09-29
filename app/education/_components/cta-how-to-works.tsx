import SectionContainer from "@/components/section-container";

const CtaWorks = () => {
  return (
    <SectionContainer>
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-highland-600 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Tau ga sih? Ternyata sampah melewait banyak proses pembuangannya loh!
              </h2>

              <p className="hidden text-white/90 sm:mt-4 sm:block">
                Sampah melewati banyak proses sebelum mencapai tempat pembuangan akhir. Mengelola
                sampah bukan hanya sekadar membuang, tetapi juga memastikan sampah dikelola dengan
                benar. Dari daur ulang hingga pemrosesan organik, setiap langkah kecil yang kita
                lakukan berdampak besar pada masa depan bumi. Mari mulai dengan memilah sampah dari
                rumah dan berkontribusi untuk lingkungan yang lebih bersih dan sehat.
              </p>

              <div className="mt-4 md:mt-8">
                <a
                  href="/education"
                  className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-highland-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-highland-400"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              alt=""
              src="https://images.pexels.com/photos/761297/pexels-photo-761297.jpeg?auto=compress&cs=tinysrgb&w=3500&h=2361&dpr=1"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
            <img
              alt=""
              src="https://images.pexels.com/photos/167538/pexels-photo-167538.jpeg?auto=compress&cs=tinysrgb&w=6000&h=4000&dpr=1"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CtaWorks;
