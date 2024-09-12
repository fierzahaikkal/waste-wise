import React from "react";

const Title = ({ text }: { text: string }) => {
  return (
    <div className="w-fit rounded-lg bg-highland-400 px-1 py-1">
      <h2 className="text-4xl font-normal text-gray-900">{text}</h2>
    </div>
  );
};

export default Title;
