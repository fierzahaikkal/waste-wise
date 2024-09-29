import SectionContainer from "@/components/section-container";

const steps = [
  {
    id: 0,
    steps: "01",
    title: "Tempat Sampah",
    desc: "Tempat pertama di mana perjalanan sampah dimulai adalah tempat sampah di rumah Anda. Memilah sampah dengan benar, seperti memisahkan plastik, organik, dan sampah lainnya, menjadi langkah awal penting. Ini membantu bank sampah dalam mengelola dan memproses sampah dengan lebih efisien.",
  },
  {
    id: 1,
    steps: "02",
    title: "Truk Sampah",
    desc: "Sampah yang sudah dipilah akan diangkut oleh truk menuju bank sampah. Di sinilah peran penting transportasi dalam memastikan sampah yang terkumpul dapat didistribusikan ke tempat yang tepat, baik untuk daur ulang maupun untuk diproses lebih lanjut.",
  },

  {
    id: 2,
    steps: "03",
    title: "Tempang Pembuangan Akhir (TPA)",
    desc: "Sebagian kecil sampah yang tidak dapat didaur ulang akan berakhir di TPA. Namun, dengan pemilahan yang baik sejak awal, volume sampah yang dikirim ke TPA dapat diminimalisir. Bank sampah memainkan peran utama dalam mengurangi jumlah sampah yang berakhir di TPA.",
  },
  {
    id: 3,
    steps: "04",
    title: "Daur Ulang",
    desc: "Di tahap akhir, sampah yang bisa didaur ulang seperti plastik, kaca, dan logam diproses untuk dijadikan bahan baku baru. Hasil dari proses ini bukan hanya mengurangi sampah, tetapi juga memberi nilai ekonomi tambahan bagi masyarakat. Dengan daur ulang, kita berkontribusi untuk lingkungan yang lebih baik dan ekonomi yang lebih berkelanjutan.",
  },
];

const HowItWorks = () => {
  return (
    <SectionContainer>
      <div className="row-gap-10 grid gap-6 lg:grid-cols-2">
        <div className="lg:py-6 lg:pr-16">
          {steps.map(step => (
            <div className="flex" key={step.id}>
              <div className="mr-4 flex flex-col items-center">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                    <p>{step.steps}</p>
                  </div>
                </div>
                <div className="h-full w-px bg-gray-300" />
              </div>
              <div className="pb-8 pt-1">
                <p className="mb-2 text-lg font-bold">{step.title}</p>
                <p className="text-gray-700">{step.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                  <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      points="6,12 10,16 18,8"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-lg font-bold">Recycling</p>
              <p className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="inset-0 h-96 w-full rounded object-cover object-bottom shadow-lg lg:absolute lg:h-full"
            src="https://images.unsplash.com/photo-1682668373702-10e0eb560e44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default HowItWorks;
