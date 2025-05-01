import type { PageProps } from "@/shared/models";
import { OrdersPage } from "./orders";

export default async function MyOrders({ params }: PageProps<object>) {
	const { lang } = await params;
	return <OrdersPage lang={lang} />;
}
