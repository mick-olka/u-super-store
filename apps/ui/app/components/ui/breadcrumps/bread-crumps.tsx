import { TightArrowRightIcon } from "@/app/[lang]/assets/icons/tight-arrow-right";
import { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes } from "@/shared/models";
import Link from "next/link";
import React from "react";

import { localeUrl } from "@/shared/utils";

type Props = {
  items: { name: string; link: string }[];
  lang: Locale;
  homeLabel: string;
};

export const BreadCrumps = ({ items, lang, homeLabel }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 text-gray-400 text-sm">
        <Link href={localeUrl(E_AppRoutes.home, lang)} className="hover:underline hover:text-gray-600">
          {homeLabel || "Home"}
        </Link>
        {items.map(i => (
          <React.Fragment key={i.name}>
            <span>
              <TightArrowRightIcon variant="grey" size="sm" />
            </span>
            <Link href={i.link} className="hover:underline hover:text-gray-600">
              {i.name}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
