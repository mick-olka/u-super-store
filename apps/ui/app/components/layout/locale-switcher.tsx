"use client";

import { Selector } from "@/app/[lang]/components/inputs/selector";
import { type Locale, i18n } from "@/shared/configs/i18n-config";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const pathName = usePathname();
  const router = useRouter();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const handleClickItem = (v: Locale | null) => {
    if (v) router.push(redirectedPathName(v));
  };

  return (
    <div>
      <Selector
        hideArrow
        value={lang}
        onItemSelect={handleClickItem}
        list={i18n.locales.map(l => ({ name: l.toUpperCase(), value: l }))}
        className="text-gray-500"
      />
    </div>
  );
}
