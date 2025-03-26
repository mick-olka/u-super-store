import { VariantProps, cva } from "class-variance-authority";
import { DetailedHTMLProps, ForwardedRef, HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";

import { classnames } from "@/shared/utils";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  VariantProps<typeof fieldVariants> & {
    error?: string;
  };
export const TextField = forwardRef(
  ({ variant, inputSize, className, error, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        <input
          ref={ref}
          className={classnames(fieldVariants({ variant, inputSize, className }), "")}
          {...(props as HTMLAttributes<HTMLInputElement>)}
        />
        {error && <div className="text-red-500 relative">{error}</div>}
      </>
    );
  },
);

const fieldVariants = cva("h-10 p-1 px-4 rounded-lg focus:outline-none focus:shadow-inner leading-none transition", {
  variants: {
    variant: {
      solid: "bg-gray-100",
      underline: "rounded-sm border-b-2 bgb-gray-900",
      error: "border-2 border-red-400",
      bordered: "bg-none border-gray-200 border focus:border-gray-300",
    },
    inputSize: {
      sm: "text-sm h-8",
      md: "text-base h-10",
      lg: "text-xl h-12",
    },
  },
  defaultVariants: {
    variant: "bordered",
    inputSize: "md",
  },
});

TextField.displayName = "TextField";
