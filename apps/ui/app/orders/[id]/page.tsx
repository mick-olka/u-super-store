"use client";

import { BreadCrumps } from "@/app/components/ui";
import { useDictionary, useGetOrderById } from "@/shared/hooks";
import { E_AppRoutes, type PageProps } from "@/shared/models/app";

export default function CheckoutPage({ params }: PageProps<{ id: string }>) {
	const dictionary = useDictionary();
	const { data } = useGetOrderById({ id: params.id, lang: params.lang });
	if (data)
		return (
			<div className="flex w-full flex-col justify-center items-center h-screen bg-gray-200 text-gray-900">
				<BreadCrumps
					items={[
						{ name: dictionary.order.orders, link: E_AppRoutes.orders },
						{ name: data._id, link: "#" },
					]}
					lang={params.lang}
					homeLabel={dictionary.sidebar.home}
				/>
				<div className="rounded-md relative w-96 shadow-2xl p-3 bg-white">
					<div className="py-2">
						<div className="text-center text-xl font-bold uppercase">
							{dictionary.order.order}
						</div>
						<div className="text-center text-xs font-bold"># {data._id}</div>
					</div>
					<div className="text-center text-xs font-bold mb-1">
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					</div>
					<div className="text-xs pl-2">
						<div className="text-xs mb-1">
							{dictionary.order.customer}： {data.name}
						</div>
						<div className="text-xs mb-1">
							{dictionary.order.phone_number}： {data.phone}
						</div>
						{/* <div>OrderNumber：{data._id}</div> */}
						<div>
							{dictionary.order.status}：{data.status}
						</div>
					</div>
					<div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
						<div className="flex text-sm pt-1 px-1">
							<span className="w-3/6">{dictionary.order.name}</span>
							<span className="w-2/6 text-left">{dictionary.order.price}</span>
							<span className="w-1/6 text-right">
								{dictionary.order.quantity}
							</span>
						</div>
						<div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
							{data.cart.map((item) => {
								// const product =
								return (
									<div
										key={`item${item.product._id}`}
										className="flex justify-between text-sm"
									>
										<span className="w-3/6">{item.product.name.ua}</span>
										<span className="w-2/6 text-left">
											UAH {item.product.price * 40}
										</span>
										<span className="w-1/6 text-right">{item.count}</span>
									</div>
								);
							})}
							{/* <div className="flex justify-between text-sm">
                <span className="w-2/6 truncate">Boxing glove</span>
                <span className="w-2/6 text-right">$9998</span>
                <span className="w-2/6 text-right">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="w-2/6 truncate">Purified water</span>
                <span className="w-2/6 text-right">$2</span>
                <span className="w-2/6 text-right">4</span>
              </div> */}
						</div>
					</div>
					<div className="text-xs">
						<div className="mb-1">{dictionary.order.discount}：UAH 0</div>
						<div className="mb-52">
							{dictionary.order.remark}：{data.message}
						</div>
						<div className="text-right">
							<div>
								{dictionary.order.time}：{new Date(data.date).toUTCString()}
							</div>
							<div className="font-bold text-sm">
								{dictionary.order.total}：UAH {data.sum * 40}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	return <div>Loading...</div>;
}
