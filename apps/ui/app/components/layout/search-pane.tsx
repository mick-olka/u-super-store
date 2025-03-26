"use client";

import { SearchIcon } from "@/app/[lang]/assets/icons/search";
import { TextField } from "@/app/[lang]/components/inputs/text-field";
import type { Locale } from "@/shared/configs/i18n-config";
import { useDictionary } from "@/shared/hooks";
import { E_AppRoutes } from "@/shared/models";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { Button } from "@/app/[lang]/components/button";
import { classnames, localeUrl } from "@/shared/utils";

export const SearchField = ({
  lang,
  className,
  onSearchSubmit,
  showSubmitButton = false,
}: {
  lang: Locale;
  className?: string;
  onSearchSubmit?: (search: string) => void;
  showSubmitButton?: boolean;
}) => {
  const router = useRouter();
  const dictionary = useDictionary();
  const [search, setSearch] = useState("");
  const triggerSearch = () => {
    onSearchSubmit?.(search);
    if (search)
      router.push(localeUrl(`${E_AppRoutes.search}?search=${search}`, lang));
    else router.push(localeUrl(E_AppRoutes.home, lang));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // const search = e.currentTarget.value;
      triggerSearch();
    }
  };
  return (
    <div className={classnames("relative hidden md:flex", className)}>
      <TextField
        type="search"
        variant="solid"
        placeholder={dictionary.header.search}
        onKeyDown={handleEnter}
        onChange={handleChange}
        className="pl-10"
      />
      <SearchIcon
        variant="grey"
        className="absolute top-0 left-0 ml-2 mt-2"
        onClick={triggerSearch}
      />
      {showSubmitButton && (
        <Button variant="solid" onClick={triggerSearch}>
          <SearchIcon variant="white" className="mt-1" />
        </Button>
      )}
    </div>
  );
};
