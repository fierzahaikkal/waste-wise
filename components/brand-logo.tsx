import { cn } from "@nextui-org/react";
import { Recycle } from "lucide-react";
import React from "react";
import Show from "./elements/show";
import Link from "next/link";

type Props = {
  iconSize: number;
  textSize: string; // Accepts tailwind text-size classes
  className?: string;
  showIcon?: boolean;
};

/**
 *
 * @param props iconSize - number, textSize - Tailwind classes e.g., text-xl etc
 * @returns
 */
const BrandLogo = (props: Props) => {
  const { iconSize, textSize, className, showIcon } = props;

  return (
    <div className="flex items-center justify-center space-x-4">
      <Show when={showIcon!}>
        <Recycle color="#a4bc99" size={iconSize ?? 56} />
      </Show>
      <Link
        href={"/"}
        className={cn("text-5xl font-bold", className, {
          [textSize]: textSize,
        })}
      >
        WasteWise
      </Link>
    </div>
  );
};

export default BrandLogo;
