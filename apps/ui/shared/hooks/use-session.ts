"use client";
enum SessionItems {
  access_token = "access_token",
}

export const useSession = () => {
  const initialized = typeof sessionStorage !== "undefined";
  const setAccessToken = (token: string | null) => {
    if (initialized) {
      if (token) sessionStorage.setItem(SessionItems.access_token, token);
      else sessionStorage.removeItem(SessionItems.access_token);
    }
    return null;
  };
  const getAccessToken = () => {
    if (initialized) {
      return sessionStorage.getItem(SessionItems.access_token);
    }
    return null;
  };

  return {
    setAccessToken,
    getAccessToken,
  };
};
