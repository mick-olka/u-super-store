"use client";

import { globalConfig } from "@/shared/configs/global";
import { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, I_User, T_UserForm } from "@/shared/models";
import { fetchWithAuth } from "@/shared/utils/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

import { localeUrl } from "@/shared/utils";

import { useSession } from "./use-session";

export const useGetProfile = (lang?: Locale) => {
  const storage = useSession();
  let token = storage.getAccessToken();
  const router = useRouter();
  const { data, error, isLoading } = useSWR<I_User>(token ? ["/users/me", token] : null, ([url, token]) =>
    fetchWithAuth(url, String(token)),
  );
  useEffect(() => {
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

export const useUpdateProfile = () => {
  const { getAccessToken } = useSession();
  const token = getAccessToken();
  const { mutate } = useSWRConfig();
  const updateProfile = async (body: T_UserForm) => {
    const res = await fetch(globalConfig.apiUrl + "/users/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data: I_User = await res.json();
      if (data) {
        mutate(["/users/me", token]);
      } else {
        alert("Server error");
      }
    }
  };
  return { updateProfile };
};

export const useDeleteProfile = (lang?: Locale) => {
  const router = useRouter();
  const { getAccessToken } = useSession();
  const token = getAccessToken();
  const { mutate } = useSWRConfig();
  const deleteProfile = async () => {
    const res = await fetch(globalConfig.apiUrl + "/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    });
    if (res.ok) {
      const data: I_User = await res.json();
      if (data) {
        router.push(localeUrl(E_AppRoutes.login, lang || "en"));
      } else {
        alert("Server error");
      }
    }
  };
  return { deleteProfile };
};
