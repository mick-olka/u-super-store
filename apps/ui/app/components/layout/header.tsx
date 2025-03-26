import { InfoIcon } from "@/app/[lang]/assets/icons/info";
// import { UserIcon } from "@/app/[lang]/assets/icons/user";
import { Button } from "@/app/[lang]/components/button";
import LocaleSwitcher from "@/app/[lang]/components/layout/locale-switcher";
import { PhonesList } from "@/app/[lang]/components/ui/phones-list";
import { globalConfig } from "@/shared/configs/global";
import type { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, type I_TextBlock } from "@/shared/models";
import Link from "next/link";

import { localeUrl } from "@/shared/utils";

import { CartBtn } from "./cart-btn";
import { SearchField } from "./search-pane";

export const Header = ({
  lang,
  phones,
}: {
  lang: Locale;
  phones: I_TextBlock;
}) => {
  const phonesList = phones.text[lang]
    .split(";")
    .filter((p) => Boolean(p))
    .map((phone) => ({ label: phone, value: phone }));
  return (
    <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2 fixed z-10">
      <div className="flex items-center space-x-2">
        <Link
          href={localeUrl(E_AppRoutes.home, lang)}
          className="font-bold text-gray-700 text-2xl"
        >
          <h1 className="mx-8">{globalConfig.shopLabel}</h1>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <PhonesList phones={phonesList} />
        <LocaleSwitcher lang={lang} />
        <SearchField lang={lang} />
        <Link href={localeUrl(E_AppRoutes.about, lang)}>
          <Button variant="bordered" className="border-gray-200">
            <InfoIcon variant="grey" />
          </Button>
        </Link>
        <CartBtn lang={lang} />

        {/* <Link href={localeUrl(E_AppRoutes.profile, lang)}>
          <Button variant="bordered" className="border-gray-200">
            <UserIcon variant="grey" />
          </Button>
        </Link> */}
      </div>
    </header>
  );
};
