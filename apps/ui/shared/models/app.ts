import { Locale } from "@/shared/configs/i18n-config";

export enum E_AppRoutes {
  home = "/",
  cart = "/cart",
  profile = "/profile",
  login = "/login",
  register = "/login/register",
  collection = "/collection",
  orders = "/orders",
  search = "/search",
  about = "/about",
  checkout = "/cart/checkout",
  product = "/product",
  privacy_policy = "/about/privacy-policy",
  terms_of_service = "/about/terms-of-service",
}

export type LocaleParam<T extends object> = T & {
  lang: Locale;
};

export type PageProps<Params extends object, SearchParams = {}> = {
  params: LocaleParam<Params>;
  searchParams: SearchParams;
};
