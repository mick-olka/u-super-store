import { Locale } from "@/shared/configs/i18n-config";

export const localeUrl = (url: string, locale: Locale) => {
  return `/${locale}${url}`;
};
