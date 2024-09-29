import SectionContainer from "@/components/section-container";

const wasteTypes = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1601507793214-77d2a926582a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBsYXN0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "Sampah plastik",
    title: "Sampah plastik",
    desc: "Sampah plastik meliputi barang-barang seperti kantong belanja, botol minuman, dan kemasan makanan. Plastik membutuhkan waktu lama untuk terurai, jadi penting untuk mendaur ulangnya agar bisa digunakan kembali. Dengan mendaur ulang sampah plastik, kita dapat membantu menjaga lingkungan tetap bersih dan mengurangi limbah.",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1516554724781-97f823109417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fGdsYXNzfGVufDB8fDB8fHww",
    alt: "Sampah kaca",
    title: "Sampah kaca",
    desc: "Sampah kaca terdiri dari botol minuman, kaca jendela, dan produk lain yang terbuat dari kaca. Kaca bisa didaur ulang berkali-kali tanpa mengurangi kualitasnya. Memilah dan mendaur ulang kaca dapat membantu mengurangi penggunaan bahan baku baru dan menjaga lingkungan tetap aman dari pecahan kaca.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1533478583204-680d4ff74891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG9yZ2FuaWN8ZW58MHx8MHx8fDA%3D",
    alt: "Sampah organik",
    title: "Sampah organik",
    desc: "Sampah organik adalah sisa-sisa alami seperti kulit buah, sisa sayuran, daun, dan ranting. Sampah ini dapat diubah menjadi kompos, yang sangat berguna untuk tanaman dan tanah. Dengan mengolah sampah organik, kita dapat mengurangi timbunan sampah di tempat pembuangan akhir dan memberikan manfaat bagi alam.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1717667745934-53091623e8ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sampah elektronik",
    title: "Sampah elektronik",
    desc: "Sampah elektronik seperti ponsel, laptop, dan televisi yang sudah tidak terpakai. Barang-barang elektronik ini mengandung komponen berharga yang bisa didaur ulang, serta bahan berbahaya yang perlu penanganan khusus. Dengan mendaur ulang e-waste, kita bisa menjaga lingkungan tetap aman dan mengurangi limbah elektronik.",
  },
];

const WasteTypes = () => {
  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold" id="waste-types">
        Ternyata Jenis Sampah Beragam Loh!
      </h2>
      <p className="mb-[80px] text-gray-600">
        Terdapat banyak jenis sampah yang sering kita temui pada kehidupan sehari-hari, yuk pelajari
        lebih dalam!
      </p>
      {wasteTypes.map(type => (
        <div key={type.id} className="mb-[80px]">
          {type.id % 2 === 0 ? (
            <div className="flex flex-col overflow-hidden rounded-lg bg-highland-100 shadow-md lg:flex-row">
              <img src={type.src} alt={type.alt} className="aspect-video h-80 object-cover" />
              <div className="flex flex-1 flex-col justify-center p-6">
                <span className="text-xs uppercase">Jenis</span>
                <h3 className="text-xl font-bold md:text-2xl">{type.title}</h3>
                <p className="my-6">{type.desc}.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden rounded-lg bg-highland-100 shadow-md lg:flex-row-reverse">
              <img
                src={type.src}
                alt={type.alt}
                className="aspect-video h-80 object-cover dark:bg-gray-500"
              />
              <div className="flex flex-1 flex-col justify-center p-6 dark:bg-gray-50">
                <span className="text-xs uppercase">Jenis</span>
                <h3 className="text-xl font-bold md:text-2xl">{type.title}</h3>
                <p className="my-6">{type.desc}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </SectionContainer>
  );
};

export default WasteTypes;
