import { I_Collection } from "@/shared/models/collections-model";

import { E_Locales, LocalesObjectT } from "./locales-model";
import { I_PhotosBlock } from "./photos-model";

export type I_ProductFeatures = {
  [key in E_Locales]: {
    key: string;
    value: string;
  }[];
};

export interface I_ProductPhotos {
  _id: string;
  main_color: LocalesObjectT<string>;
  pill_color: LocalesObjectT<string>;
  path_arr: string[];
}

export interface I_Product {
  _id: string;
  name: LocalesObjectT<string>;
  url_name: string;
  code: string;
  price: number;
  old_price: number;
  thumbnail: string;
  keywords: string[];
  description: LocalesObjectT<string>;
  features: I_ProductFeatures;
  photos: I_PhotosBlock[];
  collections: Pick<I_Collection, "_id" | "name" | "url_name">[];
  related_products: I_ProductRelated[];
  similar_products: I_ProductRelated[];
  index: number;
}

export interface I_ProductRelated
  extends Pick<
    I_Product,
    "_id" | "name" | "price" | "url_name" | "old_price" | "thumbnail" | "index" | "description"
  > {}

export interface I_ProductExtended extends Omit<I_Product, "related_products" | "similar_products" | "photos"> {
  related_products: I_ProductRelated[];
  similar_products: I_ProductRelated[];
  photos: I_ProductPhotos[];
}

export interface I_ProductsListRes {
  docs: I_Product[];
  count: number;
}
