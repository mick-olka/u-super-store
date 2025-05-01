"use client";

import { globalConfig } from "@/shared/configs/global";
import type { Locale } from "@/shared/configs/i18n-config";
import { E_AppRoutes } from "@/shared/models/app";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

import { localeUrl } from "@/shared/utils";

export const useAuthGuard = (lang?: Locale) => {
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const accessToken = sessionStorage.getItem("access_token");
		// if (!globalConfig.userCanOrderWithoutAuth && !accessToken) {
		if (!accessToken) {
			router.push(localeUrl(E_AppRoutes.login, lang || "en"));
		}
	}, []);
};
