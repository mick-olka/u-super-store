import { globalConfig } from "@/shared/configs/global";
import { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes, T_RegisterForm } from "@/shared/models";
import { useRouter } from "next/navigation";

import { localeUrl } from "@/shared/utils";

import { useSession } from "./use-session";

type TokensRes = {
  access_token: string;
  refresh_token: string;
};

export const useSignIn = (lang?: Locale) => {
  const { setAccessToken } = useSession();
  const router = useRouter();
  const signIn = async (body: { email: string; password: string }) => {
    const res = await fetch(globalConfig.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      alert("Invalid credentials");
    } else {
      const data: TokensRes = await res.json();
      if (data) {
        setAccessToken(data.access_token);
        router.push(localeUrl(E_AppRoutes.profile, lang || "en"));
      }
    }
  };
  return { signIn };
};

type RegisterDTO = Omit<T_RegisterForm, "password_repeat"> & {
  first_name: string;
  last_name: string;
  type: "user";
};

export const useRegister = (lang?: Locale) => {
  const { setAccessToken } = useSession();
  const router = useRouter();
  const register = async (body: T_RegisterForm) => {
    const b: RegisterDTO = { ...body, type: "user" };
    const res = await fetch(globalConfig.apiUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(b),
    });
    if (!res.ok) {
      alert("Invalid credentials or already registered");
    } else {
      const data: TokensRes = await res.json();
      if (data) {
        setAccessToken(data.access_token);
        router.push(localeUrl(E_AppRoutes.profile, lang || "en"));
      }
    }
  };
  return { signUp: register };
};

export const useLogout = (lang?: Locale) => {
  const router = useRouter();
  const { setAccessToken } = useSession();
  const logout = () => {
    setAccessToken(null);
    router.push(localeUrl(E_AppRoutes.login, lang || "en"));
  };
  return { logout };
};
