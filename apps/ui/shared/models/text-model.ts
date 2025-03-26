import { LocalesObjectT } from "./locales-model";

export interface I_TextBlock {
  _id: string;
  name: string;
  text: LocalesObjectT<string>;
  font: object;
  url: string;
}

export enum TextBlocks {
  dollar = "dollar",
  about_shop = "about_shop",
  main_description = "main_description",
  header_text = "header_text",
  phones = "phones",
}
