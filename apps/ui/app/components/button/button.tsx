import { type VariantProps, cva } from "class-variance-authority";
import {
  type ButtonHTMLAttributes,
  type ForwardedRef,
  forwardRef,
} from "react";

import { classnames } from "@/shared/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {};

export const Button = forwardRef(
  (
    { variant, size, className, children, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    // const disable = props.disabled ? "bg-gray-300 hover:opacity-1" : ""
    return (
      <button
        ref={ref}
        {...props}
        className={classnames(
          buttonVariants({ variant, size, className }),
          props.disabled ? "bg-gray-300 hover:opacity-1" : ""
        )}
      >
        {children}
      </button>
    );
  }
);

const buttonVariants = cva(
  "py-2 px-4 rounded-md font-semibold hover:opacity-80 transition flex justify-center",
  {
    variants: {
      variant: {
        solid: "bg-blue-500 text-white",
        danger: "bg-red-500 text-white",
        bordered: "bg-none border-gray-950 border",
      },
      size: {
        sm: "text-sm px-1 py-0",
        md: "text-base px-2 py-1",
        lg: "text-xl px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

Button.displayName = "Button";
