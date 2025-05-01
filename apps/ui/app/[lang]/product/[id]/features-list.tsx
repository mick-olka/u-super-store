import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/shared/configs/i18n-config";
import type { I_ProductFeatures } from "@/shared/models";
import React, { use } from "react";

type Props = {
	lang: Locale;
	list: I_ProductFeatures;
};

export const FeaturesList = ({ lang, list }: Props) => {
	const dictionary = use(getDictionary(lang));
	return (
		<div className="my-4">
			<h3 className="font-bold text-lg mb-4 mt-8">
				{dictionary.product.features}
			</h3>
			{list[lang].map((f) => (
				<div
					key={f.key}
					className="flex justify-between max-w-2xl my-4 font-semibold"
				>
					<span>{f.key}</span>
					<hr className="flex-1 mx-4 border-gray-300 mt-3" />
					<span className="max-w-96 font-light text-right">{f.value}</span>
				</div>
			))}
		</div>
	);
};
