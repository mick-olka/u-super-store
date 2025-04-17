import { E_Languages, I_Collection, I_Locales, I_Photos } from '.'

export type I_ProductFeatures = {
  [key in E_Languages]: {
    key: string
    value: string
  }[]
}

export interface I_ProductPopulated {
  _id: string
  name: I_Locales
  url_name: string
  thumbnail: string
  price: number
  old_price: number
}

export interface I_Product {
  _id: string
  name: I_Locales
  url_name: string
  code: string
  price: number
  old_price: number
  thumbnail: string
  keywords: string[]
  description: I_Locales
  features: I_ProductFeatures
  photos: I_Photos[]
  related_products: I_ProductPopulated[]
  similar_products: I_ProductPopulated[]
  collections: Pick<I_Collection, '_id' | 'name' | 'url_name'>[]
  index?: number
  active: boolean
}

export interface I_ProductsResData {
  count: number
  docs: I_Product[]
}

export interface I_ProductForm {
  name: I_Locales
  code: string
  price: number
  old_price?: number
  index?: number
  keywords?: string[]
  description?: I_Locales
  features: I_ProductFeatures
  url_name?: string
  active?: boolean
}

export interface I_ProductDto {
  name: I_Locales
  code: string
  price: number
  oldPrice?: number
  thumbnail?: File
  related_products?: string[]
  similar_products?: string[]
  index?: number
  keywords?: string[]
  description?: I_Locales
  features?: I_ProductFeatures
  url_name?: string
  active?: boolean
}

export interface I_ProductItemsDto {
  items: string[]
  type: 'related' | 'similar'
  action: 'add' | 'delete'
}
