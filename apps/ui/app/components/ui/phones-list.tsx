"use client";

import { PhoneIcon } from "@/app/[lang]/assets/icons/phone";
import { Dropdown } from "@/app/[lang]/components/ui/dropdown/dropdown";
import Link from "next/link";
import React from "react";

type Props = {
  phones: { label: string; value: string }[];
};

export const PhonesList = ({ phones }: Props) => {
  const list = phones.map(p => (
    <div key={p.value} className="p-2">
      <Link href={"tel:" + p.value}>{p.label}</Link>
    </div>
  ));
  return (
    <Dropdown itemsList={list} className="min-w-12 w-12" hideArrow>
      <PhoneIcon variant="grey" className="w-5 h-5" />
    </Dropdown>
  );
};
