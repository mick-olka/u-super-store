import { I_Product } from "./products-model";

export interface I_OrderItem {
  // _id: string
  name: string;
  product: string;
  count: number;
  main_color: string;
  pill_color: string;
  price: number;
}

export interface I_Order {
  status: string;
  _id: string;
  name: string;
  phone: string;
  message: string;
  sum: number;
  date: string;
  cart: I_OrderItem[];
}

export interface I_OrderPopulated extends Omit<I_Order, "cart"> {
  cart: I_OrderItemPopulated[];
}

export interface I_OrderItemPopulated {
  // _id: string
  product: I_Product;
  count: number;
  main_color: string;
  pill_color: string;
}

export interface I_OrderDTO extends Pick<I_Order, "name" | "phone" | "message" | "sum" | "cart"> {}
