import Link from "next/link";
import SectionContainer from "../../components/section-container";

const features = [
  {
    id: 0,
    imageUrl: "/images/root-hero-images/feature-deposit.svg",
    alt: "",
    title: "Mari setorkan sampahmu disini!",
    description:
      "Tempat di mana Anda dapat menyimpan dan melacak hasil penjualan sampah daur ulang Anda. Setiap sampah yang Anda kumpulkan dan jual akan otomatis ditambahkan ke tabungan digital Anda. Yuk cek sekarang!",
  },
  {
    id: 1,
    imageUrl: "    /images/root-hero-images/feature-ai.svg",
    alt: "",
    title: "Gunakan AI chat kami untuk kemudahanmu!",
    description:
      "Livechat berbasis AI membantu memudahkan anda untuk mencari tahu hal mengenai EcoSmart. Bisa tanya kapanpun loh!",
  },
  {
    id: 2,
    imageUrl: "/images/root-hero-images/feature-checkout.svg",
    alt: "",
    title: "Ayo beli produk daur ulang kami!",
    description: "Product daur ulang yang berkualitas  dapat anda temukan disini, cek sekarang!",
  },
  {
    id: 3,
    imageUrl: "/images/root-hero-images/feature-earning-tracker.svg",
    alt: "",
    title: "Ga perlu ribet cukup bayar disini!",
    description:
      "Untuk membeli produk daur ulang, kami menyediakan sistem pembayaran sehinnga kamu ga perlu ribet untuk membeli dan membayarnya.",
  },
];

const Services = () => {
  return (
    <SectionContainer>
      <div
        id="services"
        className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
      >
        <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Temukan layanan yang kamu&nbsp;
            <span className="mb-5 mt-3 inline-block rounded-full bg-highland-200 px-6 py-2">
              butuhkan
            </span>
          </h2>

          <p className="mt-4 text-gray-600">
            Temukan secara mendalam berbagai fitur unggulan yang kami tawarkan!
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl border-2 border-highland-600 px-12 py-3 text-sm font-medium text-black transition duration-700 ease-in-out hover:bg-highland-700 hover:text-white focus:outline-none"
          >
            Mari Memulai Sekarang
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="/education"
            >
              <span className="inline-block rounded-lg p-3">
                <img
                  src={feature.imageUrl}
                  width={100}
                  height={100}
                  loading="lazy"
                  decoding="async"
                  data-nimg={index + 1}
                  alt={feature.alt}
                  className="mx-auto"
                />
              </span>

              <h2 className="mt-2 font-bold">{feature.title}</h2>

              <p className="hidden text-justify sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Services;
