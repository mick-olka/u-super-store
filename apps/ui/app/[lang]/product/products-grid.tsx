import { ItemsGrid } from "@/app/[lang]/components/ui";
import type { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, type I_ProductRelated } from "@/shared/models";
import React from "react";

import { localeUrl } from "@/shared/utils";

import { ProductCard } from "./product-card";

type Props = {
	products: I_ProductRelated[];
	lang: Locale;
};

export const ProductsGrid = ({ products, lang }: Props) => {
	const items = products.map((product) => ({
		link: localeUrl(`${E_AppRoutes.product}/${product.url_name}`, lang),
		content: <ProductCard product={product} lang={lang} />,
	}));
	return <ItemsGrid items={items} />;
};
