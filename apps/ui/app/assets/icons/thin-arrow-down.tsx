import { classnames, createIcon } from "@/shared/utils";

{
  /* <svg className="-mr-1 h-5 w-5 text-gray-400 ml-auto" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path
  fillRule="evenodd"
  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
  clipRule="evenodd"
/>
</svg> */
}

export const ThinArrowDown = createIcon(({ className, ...props }, ref) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   // className="h-6 w-6 text-yellow-400"
    //   viewBox="0 0 20 20"
    //   fill="currentColor"
    //   ref={ref}
    //   {...props}
    //   className={classnames(className)}
    // >
    //   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    // </svg>
    <svg
      // className="-mr-1 h-5 w-5 text-gray-400 ml-auto"
      ref={ref}
      {...props}
      className={classnames(className)}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
});
