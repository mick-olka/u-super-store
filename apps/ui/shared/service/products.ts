import { globalConfig } from "@/shared/configs/global";
import { I_Product, I_ProductsListRes } from "@/shared/models";

import { revalidation } from "./data";

export async function getProducts(search?: string): Promise<I_ProductsListRes> {
  const link = search ? `${globalConfig.apiUrl}/products?regex=${search}` : `${globalConfig.apiUrl}/products`;
  const res = await fetch(link, revalidation);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getProductById(id: string): Promise<I_Product> {
  const res = await fetch(globalConfig.apiUrl + "/products/" + id, revalidation);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
