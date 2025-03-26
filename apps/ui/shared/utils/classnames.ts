import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const classnames = <T extends ClassValue[]>(...classes: T) => {
  return twMerge(clsx(...classes));
};
