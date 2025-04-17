import { ItemsGrid } from "@/app/[lang]/components/ui/items-grid";
import { ProductCard } from "@/app/[lang]/product/product-card";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { E_AppRoutes, type I_Product, type PageProps } from "@/shared/models";
import { getProducts } from "@/shared/service";

import { localeUrl } from "@/shared/utils";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type Props = PageProps<{}, { search: string }>;

export default async function SearchPage({ params, searchParams }: Props) {
	const { lang } = await params;
	const data = await getProducts(searchParams.search);
	const dictionary = await getDictionary(lang);

	const items = data.docs.map((product: I_Product) => ({
		link: localeUrl(`${E_AppRoutes.product}/${product.url_name}`, lang),
		content: <ProductCard product={product} lang={lang} />,
	}));

	return (
		<div className="w-full p-4">
			<h2 className="text-xl font-bold m-5">
				{dictionary.search.search_results} &quot;{searchParams.search}&quot;
			</h2>
			{items.length ? null : (
				<div className="m-5 text-lg">
					{dictionary.search.no_results} &quot;{searchParams.search}&quot;
				</div>
			)}
			<ItemsGrid items={items} />
		</div>
	);
}
