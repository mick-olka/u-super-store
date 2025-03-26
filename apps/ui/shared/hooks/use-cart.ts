"use client";

import { I_OrderItem } from "@/shared/models";
import { useEffect, useState } from "react";

enum Items {
  cart = "cart",
  name = "name",
  phone = "phone",
  message = "message",
  orders = "orders",
  spec = "spec",
}

export const useCart = () => {
  const setCart = (cart: I_OrderItem[]): void => {
    localStorage.setItem(Items.cart, JSON.stringify(cart));
  };
  const getCart = (): I_OrderItem[] => {
    if (typeof window !== "undefined") {
      const str = localStorage.getItem(Items.cart);
      if (str) {
        const cart = JSON.parse(str) as I_OrderItem[] | null;
        return cart || [];
      }
    }
    return [];
  };
  const addToCart = (item: I_OrderItem): void => {
    const str = localStorage.getItem(Items.cart);
    if (str) {
      const cart = JSON.parse(str) as I_OrderItem[] | null;
      const new_cart: I_OrderItem[] = [...(cart || []), item];
      localStorage.setItem(Items.cart, JSON.stringify(new_cart));
    } else {
      localStorage.setItem(Items.cart, JSON.stringify([item]));
    }
  };

  const removeFromCart = (id: string): I_OrderItem[] => {
    const str = localStorage.getItem(Items.cart);
    if (str) {
      const cart = JSON.parse(str) as I_OrderItem[];
      const new_cart = cart.filter(i => i.product !== id);
      localStorage.setItem(Items.cart, JSON.stringify(new_cart));
      return new_cart;
    }
    return [];
  };
  const updateCartItemCount = (id: string, num: number) => {
    const str = localStorage.getItem(Items.cart);
    if (str) {
      const cart = JSON.parse(str) as I_OrderItem[];
      const new_cart = cart.map(i => {
        if (i.product === id) return { ...i, count: num };
        return i;
      });
      localStorage.setItem(Items.cart, JSON.stringify(new_cart));
    }
  };

  // specification*
  const setSpec = (spec: { name: string; value: string } | null) => {
    // localStorage.setItem(Items.spec, spec ? `${spec.name}:${spec.value}` : "");
  };
  const getSpec = () => {
    // const spec = localStorage.getItem(Items.spec);
    // if (spec) {
    //   const [name, value] = spec.split(":");
    //   if (name && value) return { name, value };
    // }
    // return { name: "", value: "" };
  };

  const [total, setTotal] = useState(0);
  const items = getCart();
  useEffect(() => {
    if (items.length) {
      const totalSum = items.map(i => i.price * i.count).reduce((a, b) => a + b);
      setTotal(totalSum);
    } else setTotal(0);
  }, [items]);

  return {
    setCart,
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    // getOrders,
    // addToOrders,

    setName: (name: string) => localStorage.setItem(Items.name, name),
    getName: (): string => localStorage.getItem(Items.name) || "",

    setPhone: (phone: string) => localStorage.setItem(Items.phone, phone),
    getPhone: (): string => localStorage.getItem(Items.phone) || "",

    setMessage: (msg: string) => localStorage.setItem(Items.message, msg),
    getMessage: (): string => localStorage.getItem(Items.message) || "",

    setSpec,
    getSpec,

    total,
  };
};
