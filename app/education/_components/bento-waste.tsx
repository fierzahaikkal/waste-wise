import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { CircleDollarSign, Users, Recycle, Trash, Atom } from "lucide-react";
import React from "react";

export function WasteCards() {
  return (
    <BentoGrid className="mx-auto md:auto-rows-[20rem]">
      {/* eslint-disable-next-line no-use-before-define */}
      {items.map((item, i) => (
        <BentoGridItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={`relative ${item.className}`}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black" />
);
const items = [
  {
    title: "Earn Money",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <CircleDollarSign className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Supporting Community",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: <Users className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contribute To Recycling Waste",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: <Recycle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "#WasteWise",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2 md:row-span-2",
    icon: <Trash className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Going To Zero Carbon Emission",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: <Atom className="h-4 w-4 text-neutral-500" />,
  },
];
