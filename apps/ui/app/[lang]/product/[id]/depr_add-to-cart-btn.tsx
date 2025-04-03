"use client";

import { CartIcon } from "@/app/[lang]/assets/icons/cart";
import { Button } from "@/app/[lang]/components/button";
import type { Locale } from "@/shared/configs/i18n-config";
import { useCart } from "@/shared/hooks/use-cart";
import {
	E_AppRoutes,
	type I_OrderItem,
	type I_ProductRelated,
} from "@/shared/models";
import { useRouter } from "next/navigation";
import React from "react";

import { localeUrl } from "@/shared/utils";

type Props = { size?: "sm" | "lg"; product: I_ProductRelated; lang: Locale };

export const AddToCartBtn = ({ product, size = "lg", lang }: Props) => {
	const { addToCart } = useCart();
	const router = useRouter();
	const handleOrderProduct = () => {
		const order: I_OrderItem = {
			product: product._id,
			price: product.price,
			count: 1,
			main_color: "",
			pill_color: "",
			name: product.name[lang],
		};
		addToCart(order);
		console.log(lang);
		router.push(localeUrl(E_AppRoutes.cart, lang));
	};
	return (
		<Button
			type="button"
			className="flex items-center justify-between"
			size={size}
			onClick={handleOrderProduct}
		>
			<CartIcon size="md" variant="white" className="mr-2" />
			Add to Cart
		</Button>
	);
};
