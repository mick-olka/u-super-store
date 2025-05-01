"use client";

import "./styles.scss";

import CardVisaFront from "@/app/[lang]/assets/images/card-visa-front.png";
import { CartList } from "@/app/[lang]/cart/cart-list";
import { monthsList, yearsList } from "@/app/[lang]/cart/checkout/data";
import { Button } from "@/app/[lang]/components/button";
import { Selector } from "@/app/[lang]/components/inputs/selector";
import { TextField } from "@/app/[lang]/components/inputs/text-field";
import { useCart, useMakeOrder } from "@/shared/hooks";
import type { I_OrderItem } from "@/shared/models";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
	const { getCart, total } = useCart();
	const { makeOrder } = useMakeOrder();
	const [cart, setCart] = useState<I_OrderItem[]>([]);
	const [number, setNumber] = useState("");
	const [holder, setHolder] = useState("");
	const [csv, setCSV] = useState("");
	const [month, setMonth] = useState("MM");
	const [year, setYear] = useState("YY");
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCart(getCart());
	}, []);
	return (
		<div className="flex h-fit gap-4 m-4 mx-auto w-screen">
			<div className="credit-card h-fit w-full ml-auto rounded-xl">
				<CartList items={cart} total={total} />
			</div>

			<div className="credit-card w-full shadow-lg mr-auto rounded-xl bg-white">
				<div className="flex flex-col justify-center items-center">
					<div className="relative">
						<Image
							className="w-full h-auto"
							src={CardVisaFront}
							alt="front credit card"
						/>
						<div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
							<p className="number mb-5 text-2xl">
								{number || "0000 0000 0000 0000"}
							</p>
							<div className="flex flex-row justify-between">
								<p>{holder || "Card Holder"}</p>
								<div className="">
									<span>{month || "00"}</span>
									<span>/</span>
									<span>{year || "00"}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-4 p-4">
					<h1 className="text-xl font-semibold text-gray-700 text-center">
						Card payment
					</h1>
					<div className="">
						<div className="my-3">
							<TextField
								type="text"
								autoComplete="billing additional-name"
								className="w-full"
								placeholder="Card holder"
								maxLength={32}
								value={holder}
								onChange={(e) => setHolder(e.currentTarget.value)}
							/>
						</div>
						<div className="my-3">
							<TextField
								type="text"
								autoComplete="billing cc-number"
								className="w-full"
								placeholder="Card number"
								maxLength={16}
								value={number}
								onChange={(e) => setNumber(e.currentTarget.value)}
							/>
						</div>
						<div className="my-3 flex flex-col">
							<div className="mb-2">
								<label htmlFor="expired" className="text-gray-700">
									Expired
								</label>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
								<Selector
									value={month}
									defaultPlaceholder="MM"
									onItemSelect={(v) => setMonth(v || "MM")}
									list={monthsList}
								/>
								<Selector
									value={year}
									defaultPlaceholder="YY"
									onItemSelect={(v) => setYear(v || "MM")}
									list={yearsList}
								/>
								<TextField
									value={csv}
									onChange={(e) => setCSV(e.currentTarget.value)}
									type="password"
									placeholder="CSV"
									maxLength={3}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 p-4">
					<Button size="lg" className="w-full rounded-xl" onClick={makeOrder}>
						Pay now
					</Button>
				</div>
			</div>
		</div>
	);
}
