import { classnames, createIcon } from "@/shared/utils";

export const TrashBinIcon = createIcon(({ className, ...props }, ref) => {
  return (
    <svg
      // className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
      className={classnames(className, "hover:text-blue-600")}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      ></path>
    </svg>
  );
});
