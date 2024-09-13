import { cn } from "@nextui-org/react";
import { HTMLProps, PropsWithChildren } from "react";

interface FlexProps extends HTMLProps<HTMLDivElement> {
  direction: "col" | "row";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  items?: "start" | "end" | "center" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  className?: string;
}

export default function Flex(props: PropsWithChildren<FlexProps>) {
  const { direction = "row", className, gap, items, justify, children, ...otherProps } = props;

  const flexGap = gap ? `gap-${gap}` : "";
  const alignItems = items ? `items-${items}` : "";
  const justifyContent = justify ? `justify-${justify}` : "";

  return (
    <div
      className={cn(`flex ${flexGap} ${alignItems} ${justifyContent} flex-${direction}`, className)}
      {...otherProps}
    >
      {children}
    </div>
  );
}
