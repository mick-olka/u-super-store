import type { PageProps } from "@/shared/models/app";
import { OrderCheckout } from "./order-page";

export default async function Checkout({ params }: PageProps<{ id: string }>) {
	const { id, lang } = await params;
	return <OrderCheckout id={id} lang={lang} />;
}
