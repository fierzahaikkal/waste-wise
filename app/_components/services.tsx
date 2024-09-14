import React from "react";
import SectionContainer from "../../components/section-container";
import SubTitle from "./subtitle";

const Services = () => {
  return (
    <SectionContainer>
      {/* title */}
      <div className="flex flex-row items-center justify-start gap-x-10 py-10">
        <SubTitle text="Services" />
        <p className="w-[70ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam porro suscipit inventore
          exercitationem sapiente fugit asperiores atque unde, minima odit.
        </p>
      </div>
    </SectionContainer>
  );
};

export default Services;
