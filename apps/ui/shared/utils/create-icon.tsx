import { VariantProps, cva } from "class-variance-authority";
import { LegacyRef, ReactNode } from "react";
import { SVGAttributes, forwardRef } from "react";

type Props = SVGAttributes<SVGElement> & VariantProps<typeof iconVariants> & {};

type IconCallback = (props: Props, ref: LegacyRef<SVGSVGElement> | undefined) => ReactNode;

export const createIcon = (iconCallback: IconCallback) => {
  // @ts-ignore
  return forwardRef(({ variant, size, className, ...props }: Props, ref: LegacyRef<SVGSVGElement> | undefined) => {
    const classes = iconVariants({ variant, size, className });
    return iconCallback({ ...props, className: classes }, ref);
  });
};

const iconVariants = cva("hover:opacity-80 transition", {
  variants: {
    variant: {
      dark: "text-black",
      white: "text-white",
      grey: "text-gray-400",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "dark",
    size: "md",
  },
});
