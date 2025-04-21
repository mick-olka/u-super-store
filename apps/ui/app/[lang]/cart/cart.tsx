"use client";
import { Button } from "@/app/[lang]/components/button";
import type { Locale } from "@/shared/configs/i18n-config";
import {
	useAuthGuard,
	useCart,
	useDictionary,
	useMakeOrder,
} from "@/shared/hooks";
import type { I_OrderItem } from "@/shared/models";
import { E_AppRoutes } from "@/shared/models/app";
import { localeUrl } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartForm } from "./cart-form";
import { CartList } from "./cart-list";

export const CartPage = ({ lang }: { lang: Locale }) => {
	useAuthGuard(lang);
	const router = useRouter();
	const dictionary = useDictionary();
	const { removeFromCart, getCart, total } = useCart();
	const { makeOrder } = useMakeOrder(lang);
	const [cart, setCart] = useState<I_OrderItem[]>([]);
	const [payment, setPayment] = useState<"card" | "post">("post");
	const handleRemoveItem = (id: string) => {
		const newCart = removeFromCart(id);
		setCart(newCart);
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const data = getCart();
		setCart(data);
	}, []);
	const canOrder = !cart.length;
	const handleMakeOrder = () => {
		if (payment === "card") {
			router.push(localeUrl(E_AppRoutes.checkout, lang));
		} else makeOrder();
	};
	return (
		<div className="flex w-full max-w-2xl flex-col mx-auto p-4">
			<h1 className="text-4xl font-bold mb-3">{dictionary.cart.my_order}</h1>
			<CartForm />
			<div className="border-b border-gray-100 px-5 py-4">
				<div className="font-semibold text-gray-800">
					{dictionary.cart.in_cart}:
				</div>
			</div>
			<CartList
				items={cart}
				onItemRemove={handleRemoveItem}
				total={total * 40}
			/>
			<div className="border-b border-gray-100 px-5 py-4">
				{/* <div className="font-semibold text-gray-800">{dictionary.cart.form.payment_method}:</div> */}
				{/* <Selector list={paymentTypes} value={payment} onItemSelect={v => setPayment(v || "card")} /> */}
				<div className="font-semibold text-gray-800">
					{dictionary.cart.delivery_note}
				</div>
			</div>
			<Button
				disabled={canOrder}
				size={"lg"}
				className="px-4 my-4"
				style={canOrder ? { backgroundColor: "#999" } : {}}
				onClick={handleMakeOrder}
			>
				{dictionary.cart.make_order}
			</Button>
		</div>
	);
};
