"use client";

import SectionContainer from "@/components/section-container";
import { useState, ReactNode } from "react";

interface ItemProps {
  title: string;
  children: ReactNode;
}

const Item = ({ title, children }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex w-full items-center justify-between p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 transform text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <SectionContainer>
      <div className="w-full sm:mx-auto">
        <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:w-full">
          <div>
            <p className="mb-4 inline-block rounded-full bg-highland-400 px-3 py-px text-xs font-semibold uppercase tracking-wider text-highland-900">
              Seputar Pertanyaan Umum
            </p>
          </div>
          <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
              >
                <defs>
                  <pattern
                    id="232db96b-4aa2-422f-9086-5a77996d1df1"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)" width="52" height="24" />
              </svg>
              <span className="relative">Frequently</span>
            </span>
            &nbsp;Ask Question
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Beberapa pertanyaan yang sering diajukan, yuk simak!
          </p>
        </div>
        <div className="space-y-4">
          <Item title="Bagaimana cara menukar sampah?">
            <ol>
              Untuk melakukan penukaran sampah menjadi poin yang dapat disimpan, maka pengguna harus
              melakukan step berikut :<li>1. Sign In/Sign up pada website</li>
              <li>2. Mengajukan tiket untuk melakukan penukaran</li>
              <li>3. Datang ke Bank Sampah kami dengan membawa sampah nya</li>
              <li>4. Melakukan proses penukaran dengan petugas kami </li>
              <li>5. Data penukaran anda bisa dilihat pada halaman dashboard anda </li>
              <li>6. Selesai </li>
            </ol>
          </Item>
          <Item title="Apakah barang yang ditampilkan dapat dibeli?">
            Tentu saja! barang yang ada pada e-commerce kami merupakan barang daur ulang dari
            tangan-tangan handal dan tentunya dapat dibeli!
          </Item>
          <Item title="Bagimana cara menjadi member di WasteWise?">
            <ol>
              Semua orang berkesempatan untuk menjadi member kami, dengan cara :&nbsp;
              <li>1. Melakukan Sign Up akun</li>
              <li>2. Mengisi data diri yang diperlukan </li>
              <li>3. Verifikasi akun </li>
              <li>4. Selesai. </li>
              Mudah bukan? yuk daftar menjadi bagian dari WasteWise!
            </ol>
          </Item>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Faq;
