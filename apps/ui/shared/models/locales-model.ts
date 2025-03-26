export enum E_Locales {
  ua = 'ua',
  en = 'en',
  de = 'de',
}

export type LocalesObjectT<T> = {
  [key in E_Locales]: T
}
