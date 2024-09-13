import React from "react";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto grid w-full grid-cols-1 px-12 md:px-20">
      {children}
    </section>
  );
};

export default SectionContainer;
