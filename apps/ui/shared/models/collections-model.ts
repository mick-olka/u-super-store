import type { LocalesObjectT } from "./locales-model";
import type { I_ProductRelated } from "./products-model";

export interface I_Collection {
	_id: string;
	name: LocalesObjectT<string>;
	url_name: string;
	items: I_ProductRelated[];
	keywords: string[];
	description: LocalesObjectT<string>;
	index: number;
}
