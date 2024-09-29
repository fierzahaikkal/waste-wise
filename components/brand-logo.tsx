import { cn } from "@nextui-org/react";
import React from "react";
import Show from "./elements/show";
import Link from "next/link";
import Logo from "@/public/waste-wise-logo.svg";
import Image from "next/image";

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
    <div className="flex items-center justify-center">
      <Show when={showIcon!}>
        <Image src={Logo} alt="logo" width={iconSize ?? 100} height={iconSize ?? 100} />
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
