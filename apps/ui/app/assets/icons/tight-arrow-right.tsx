import { classnames, createIcon } from "@/shared/utils";

export const TightArrowRightIcon = createIcon(({ className, ...props }, ref) => {
  return (
    <svg
      // className="h-5 w-5 leading-none text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ref={ref}
      {...props}
      className={classnames(className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
});
