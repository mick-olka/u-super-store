import type { PageProps } from "@/shared/models";
import { CartPage } from "./cart";

type Props = PageProps<object>;

export default async function Cart({ params }: Props) {
	const { lang } = await params;
	return <CartPage lang={lang} />;
}
