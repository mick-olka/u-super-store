import { dictionaryDE } from "@/dictionaries/de";
import { dictionaryEN } from "@/dictionaries/en";
import { dictionaryUA } from "@/dictionaries/ua";
import type { Locale } from "@/shared/configs/i18n-config";
import "server-only";

// We enumerate all dictionaries here for better linting and typescript support
const dictionaries = {
	en: () => dictionaryEN,
	de: () => dictionaryDE,
	ua: () => dictionaryUA,
	// ua: () => import("./ua.json").then(module => module.default),
};

export const getDictionary = async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.en();
