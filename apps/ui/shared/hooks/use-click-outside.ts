"use client";

import { type RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: Event) => void,
) => {
	useEffect(() => {
		const listener = (event: Event) => {
			const el = ref?.current;
			if (!el || el.contains((event?.target as Node) || null)) {
				return;
			}

			handler(event);
		};

		document.addEventListener("click", listener);
		return () => {
			document.removeEventListener("click", listener);
		};
	}, [ref, handler]);
};
