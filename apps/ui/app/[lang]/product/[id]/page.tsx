import { BreadCrumps } from "@/app/[lang]/components/ui/breadcrumps";
import { ProductsGrid } from "@/app/[lang]/product/products-grid";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { E_AppRoutes, type PageProps, TextBlocks } from "@/shared/models";
import { getProductById, getTextByName } from "@/shared/service";

import { localeUrl } from "@/shared/utils";

import { AddToCartPane } from "./add-to-cart-pane";
import { FeaturesList } from "./features-list";
import { Gallery } from "./gallery";

type Props = PageProps<{ id: string }, { spec?: string }>;

export default async function Product({ params }: Props) {
	const product = await getProductById(params.id);
	const dollar_block = await getTextByName(TextBlocks.dollar);
	const dictionary = await getDictionary(params.lang);
	const coefficient = Number(dollar_block.text[params.lang]);
	const getBreadCrumps = () => {
		const category = product.collections[0];
		if (category) {
			return [
				{
					name: category.name ? category.name[params.lang] : category.url_name,
					link: localeUrl(
						`${E_AppRoutes.collection}/${category.url_name}`,
						params.lang,
					),
				},
				{ name: product.name[params.lang], link: product.url_name },
			];
		}
		return [{ name: product.name[params.lang], link: product.url_name }];
	};
	return (
		<div className="p-4">
			<div className="py-6">
				<BreadCrumps
					items={getBreadCrumps()}
					lang={params.lang}
					homeLabel={dictionary.sidebar.home}
				/>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
					<div className="flex flex-col items-center xl:items-start xl:flex-row gap-4 -mx-4">
						<Gallery photos={product.photos} />
						<div className="md:flex-1 px-4">
							<h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
								{product.name[params.lang]}
							</h2>
							<p className="text-gray-500 text-sm">
								Code:{" "}
								<span className="text-indigo-600 hover:underline">
									{product.code}
								</span>
							</p>

							<div className="flex items-center space-x-4 my-4">
								<div>
									<div className="rounded-lg bg-gray-100 flex py-2 px-3">
										<span className="text-indigo-400 mr-1 mt-1 text-xl">
											{dictionary.product.currency}
										</span>
										<span
											className="font-bold text-indigo-600 text-3xl"
											style={product.old_price ? { color: "#f55" } : {}}
										>
											{product.price * coefficient}
										</span>
									</div>
								</div>
								<div className="flex-1">
									{product.old_price ? (
										<p className="text-gray-500 text-xl font-semibold line-through">
											{product.old_price * coefficient}
										</p>
									) : null}
									<p className="text-gray-400 text-sm">
										{dictionary.product.taxes}.
									</p>
								</div>
							</div>

							<div className="flex py-4 space-x-4">
								<AddToCartPane product={product} lang={params.lang} />
							</div>
							<h3 className="font-bold text-lg">
								{dictionary.product.description}
							</h3>
							<p
								className="text-gray-500"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{ __html: product.description.ua }}
							/>
						</div>
					</div>
					<FeaturesList list={product.features} lang={params.lang} />
					{product.related_products.length ? (
						<div className="mt-6">
							<h2 className="text-lg font-bold">
								{dictionary.product.related_products}
							</h2>
							<ProductsGrid
								products={product.related_products}
								lang={params.lang}
							/>
						</div>
					) : null}
					{product.similar_products.length ? (
						<div className="mt-6">
							<h2>{dictionary.product.similar_products}</h2>
							<ProductsGrid
								products={product.similar_products}
								lang={params.lang}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
