import { cn } from "@nextui-org/react";
import React from "react";

const SubTitle = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className="w-fit rounded-lg bg-highland-400 px-1 py-1">
      <h2 className={cn(`text-4xl font-normal capitalize text-gray-900`, className)}>{text}</h2>
    </div>
  );
};

export default SubTitle;
