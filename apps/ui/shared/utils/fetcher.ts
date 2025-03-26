import { globalConfig } from "@/shared/configs/global";

export const getURL = (path: string): string => globalConfig.apiUrl + path;

export const fetcher = (url: string) => fetch(getURL(url)).then(res => res.json());

export const fetchWithAuth = (url: string, token: string) =>
  fetch(getURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
