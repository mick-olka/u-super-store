"use client";

import { globalConfig } from "@/shared/configs/global";
import { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, I_Order, I_OrderDTO, I_OrderPopulated, I_UserOrders } from "@/shared/models";
import { fetchWithAuth } from "@/shared/utils/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import { localeUrl } from "@/shared/utils";

import { useCart } from "./use-cart";
import { useSession } from "./use-session";

export const useMakeOrder = (lang?: Locale) => {
  const { getAccessToken } = useSession();
  const { total, setCart, setMessage, getCart, getName, getPhone, getMessage } = useCart();
  const router = useRouter();
  const token = getAccessToken();
  useEffect(() => {
    // if (!globalConfig.userCanOrderWithoutAuth && !token) {
    if (!token) {
      router.push(localeUrl(E_AppRoutes.login, lang || "en"));
    }
  }, [token]);
  const sendOrder = async (body: I_OrderDTO) => {
    const res = await fetch(globalConfig.apiUrl + "/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data: I_Order = await res.json();
      if (data) {
        setCart([]);
        setMessage("");
        router.push(localeUrl(E_AppRoutes.orders, lang || "en"));
      } else {
        alert("Error sending order");
      }
    }
  };

  const makeOrder = () => {
    const name = getName();
    const phone = getPhone();
    const message = getMessage();
    const cart = getCart();
    if (name && phone && cart.length) {
      const order: I_OrderDTO = {
        cart: cart,
        message: message,
        name: name,
        phone: phone,
        sum: total,
      };
      sendOrder(order);
    } else alert("Будь ласка, заповніть форму. Please fill the form.");
  };

  return { makeOrder };
};

export const useGetOrders = (lang?: Locale) => {
  const storage = useSession();
  let token = storage.getAccessToken();
  const router = useRouter();
  const { data, error, isLoading } = useSWR<I_UserOrders>(token ? ["/users/me/orders", token] : null, ([url, token]) =>
    fetchWithAuth(url, String(token)),
  );
  useEffect(() => {
    // if (error || (!token && !globalConfig.userCanOrderWithoutAuth)) {
    if (error || !token) {
      // means user is not logged in
      router.push(localeUrl(E_AppRoutes.login, lang || "en"));
    }
  }, [error, token]);
  return {
    data,
    error,
    isLoading,
  };
};

export const useGetOrderById = ({ id, lang }: { id?: string; lang?: Locale }) => {
  const storage = useSession();
  let token = storage.getAccessToken();
  const router = useRouter();
  const { data, error, isLoading } = useSWR<I_OrderPopulated>(
    token && id ? ["/orders/" + id, token] : null,
    ([url, token]) => fetchWithAuth(url, String(token)),
  );
  useEffect(() => {
    // if (error || (!token && !globalConfig.userCanOrderWithoutAuth)) {
    if (error || !token) {
      // means user is not logged in
      router.push(localeUrl(E_AppRoutes.login, lang || "en"));
    }
  }, [error, token]);
  return {
    data,
    error,
    isLoading,
  };
};
