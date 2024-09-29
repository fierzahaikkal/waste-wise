import Link from "next/link";
import React from "react";

const EduHero = () => {
  return (
    <div className="grid grid-cols-1 place-items-center pt-36 text-white">
      <h1 className="py-4 text-2xl font-bold md:text-5xl">Mari Cari Tahu Tentang Sampah</h1>
      <p className="mb-6 max-w-[70ch] text-center">
        Mari Ketahui Lebih Lanjut Tentang Sampah Setiap hari, kita menghasilkan sampah yang bisa
        berdampak buruk pada lingkungan jika tidak dikelola dengan baik. Dengan memahami jenis-jenis
        sampah dan bagaimana cara mengolahnya, kita dapat berkontribusi untuk menjaga bumi tetap
        bersih dan sehat. Yuk, pelajari bagaimana sampah bisa diolah, didaur ulang, dan dikelola
        secara bijak untuk masa depan yang lebih hijau!
      </p>
      <div className="flex items-center gap-x-4">
        <Link href={"#waste-types"}>Baca selengkapnya</Link>
        <Link href={"/login"}>Mari bergabung!</Link>
      </div>
    </div>
  );
};

export default EduHero;
