import { classnames, createIcon } from "@/shared/utils";

export const ArrowRight = createIcon(({ className, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    // className="w-4 h-4 inline-block"
    ref={ref}
    {...props}
    className={classnames(className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
));
