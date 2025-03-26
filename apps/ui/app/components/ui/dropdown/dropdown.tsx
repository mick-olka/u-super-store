import { ThinArrowDown } from "@/app/[lang]/assets/icons/thin-arrow-down";
import { useClickOutside } from "@/shared/hooks";
import { HTMLAttributes, ReactNode, useRef, useState } from "react";

import { classnames } from "@/shared/utils";

type Props = {
  children: ReactNode;
  itemsList: ReactNode[];
  closeOnSelect?: boolean;
  hideArrow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Dropdown = ({ children, itemsList, hideArrow, closeOnSelect, className, ...props }: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const handleToggleMenu = () => {
    setOpen(prev => !prev);
  };
  const handleClickOutside = () => {
    setOpen(false);
  };
  useClickOutside(wrapperRef, handleClickOutside);
  return (
    <div ref={wrapperRef} {...props} className={classnames("min-w-full relative", className)}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
        onClick={handleToggleMenu}
        disabled={itemsList.length <= 0}
      >
        {children}
        {hideArrow ? null : <ThinArrowDown className={classnames("-mr-1 ml-auto", open ? "rotate-180" : "")} />}
      </button>
      {open ? (
        <div
          className="absolute min-w-full right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onClick={!closeOnSelect ? () => handleToggleMenu() : undefined}
        >
          <div className="py-1" role="none">
            {itemsList}
          </div>
        </div>
      ) : null}
    </div>
  );
};
