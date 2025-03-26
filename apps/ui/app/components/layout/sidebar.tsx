"use client";

import type { Dictionary } from "@/dictionaries/model";
import type { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, type I_Collection } from "@/shared/models";
import Link from "next/link";

import { SearchField } from "@/app/[lang]/components/layout/search-pane";
import { classnames, localeUrl } from "@/shared/utils";
import { useState } from "react";

const LinkItem = ({
  url,
  name,
  lang,
  onClick,
}: {
  url: string;
  name: string;
  lang: Locale;
  onClick?: () => void;
}) => {
  // const router = useRouter();
  return (
    <Link
      href={url}
      locale={lang}
      className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
      onClick={onClick}
    >
      <span className="text-2xl">
        <i className="bx bx-home" />
      </span>
      <span>{name}</span>
    </Link>
  );
};

export const Sidebar = ({
  list,
  dictionary,
  lang,
}: {
  lang: Locale;
  dictionary: Dictionary;
  list: I_Collection[];
}) => {
  return (
    <aside
      className={
        "w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 hidden lg:flex pt-4"
      }
    >
      <LinkItem
        url={localeUrl(E_AppRoutes.home, lang)}
        name={dictionary.sidebar.home}
        lang={lang}
      />
      <LinkItem
        url={localeUrl(E_AppRoutes.cart, lang)}
        name={dictionary.sidebar.cart}
        lang={lang}
      />
      <LinkItem
        url={localeUrl(E_AppRoutes.about, lang)}
        name={dictionary.sidebar.about}
        lang={lang}
      />
      <hr />
      <h3 className="font-bold pt-2">{dictionary.sidebar.categories}</h3>
      {list.map((l) => (
        <LinkItem
          key={l._id}
          lang={lang}
          url={localeUrl(`${E_AppRoutes.collection}/${l.url_name}`, lang)}
          name={l.name[lang]}
        />
      ))}
    </aside>
  );
};

export const MobileSidebar = ({
  list,
  dictionary,
  lang,
}: {
  lang: Locale;
  dictionary: Dictionary;
  list: I_Collection[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-2 z-50 lg:hidden"
        onClick={() => setIsOpen((v) => !v)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Menu"
        >
          <title>Menu</title>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <aside
        className={classnames(
          "flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 pt-4 top-12 left-0 w-full bg-white z-50 overflow-y-auto",
          isOpen ? "fixed" : "hidden"
        )}
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <SearchField
          lang={lang}
          className="flex"
          showSubmitButton
          onSearchSubmit={closeSidebar}
        />

        <LinkItem
          url={localeUrl(E_AppRoutes.home, lang)}
          name={dictionary.sidebar.home}
          lang={lang}
          onClick={closeSidebar}
        />
        <LinkItem
          url={localeUrl(E_AppRoutes.cart, lang)}
          name={dictionary.sidebar.cart}
          lang={lang}
          onClick={closeSidebar}
        />
        <LinkItem
          url={localeUrl(E_AppRoutes.about, lang)}
          name={dictionary.sidebar.about}
          lang={lang}
          onClick={closeSidebar}
        />
        <hr />
        <h3 className="font-bold pt-2">{dictionary.sidebar.categories}</h3>
        {list.map((l) => (
          <LinkItem
            key={l._id}
            lang={lang}
            url={localeUrl(`${E_AppRoutes.collection}/${l.url_name}`, lang)}
            name={l.name[lang]}
            onClick={closeSidebar}
          />
        ))}
      </aside>
    </>
  );
};
