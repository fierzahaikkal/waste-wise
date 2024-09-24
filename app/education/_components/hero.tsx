import Link from "next/link";
import React from "react";

const EduHero = () => {
  return (
    <div className="grid grid-cols-1 place-items-center pt-36 text-white">
      <h1 className="py-4 text-2xl font-bold md:text-5xl">Lets Find Out About Waste</h1>
      <p className="mb-6 max-w-[70ch] text-center">
        Lorem ipsum dolor sit amet consectetur. Id magna amet tempor vel amet dui dui turpis. Risus
        risus enim fringilla faucibus vel. Cursus venenatis convallis nunc est. Eget viverra arcu id
        amet ut cras.
      </p>
      <div className="flex items-center gap-x-4">
        <Link href={"#waste-types"}>Read more</Link>
        <Link href={"/login"}>Join us!</Link>
      </div>
    </div>
  );
};

export default EduHero;
