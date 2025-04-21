import { BreadCrumps } from "@/app/[lang]/components/ui";
import { ProductsGrid } from "@/app/[lang]/product/products-grid";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { E_AppRoutes, type PageProps } from "@/shared/models";
import { getCollectionById } from "@/shared/service";

import { localeUrl } from "@/shared/utils";

type Props = PageProps<{ url: string }>;

export default async function Collection({ params }: Props) {
	const { url, lang } = await params;
	const collection = await getCollectionById(url);
	const dictionary = await getDictionary(lang);

	const breadcrumbs = [
		{
			name: collection.name[lang],
			link: localeUrl(`${E_AppRoutes.collection}/${collection.url_name}`, lang),
		},
	];

	return (
		<div className="w-full p-4">
			<div className="w-fit p-1">
				<BreadCrumps
					items={breadcrumbs}
					lang={lang}
					homeLabel={dictionary.sidebar.home}
				/>
			</div>
			<p className="px-4">{collection.description.ua}</p>
			<ProductsGrid products={collection.items} lang={lang} />
		</div>
	);
}
