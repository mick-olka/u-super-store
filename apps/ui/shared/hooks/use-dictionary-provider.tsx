"use client";

import type { getDictionary } from "@/dictionaries/get-dictionary";
import { createContext, useContext } from "react";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
	dictionary,
	children,
}: {
	dictionary: Dictionary;
	children: React.ReactNode;
}) {
	return (
		<DictionaryContext.Provider value={dictionary}>
			{children}
		</DictionaryContext.Provider>
	);
}

export function useDictionary() {
	const dictionary = useContext(DictionaryContext);
	if (dictionary === null) {
		throw new Error(
			"useDictionary hook must be used within DictionaryProvider",
		);
	}

	return dictionary;
}
