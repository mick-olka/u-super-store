// import styles from "./page.module.css";

// export default function Home() {
// 	return (
// 		<div className={styles.page}>
// 			<main className={styles.main}>HOME PAGE (CLIENT)</main>
// 			<footer className={styles.footer}>FOOTER</footer>
// 		</div>
// 	);
// }

import { ProductsGrid } from "@/app/[lang]/product/products-grid";
import type { PageProps } from "@/shared/models";
import { getProducts } from "@/shared/service";

type Props = PageProps<{ lang: string }>;
export default async function Home({ params }: Props) {
	const { lang } = await params;
	const data = await getProducts();

	return (
		<div className="w-full p-4">
			<ProductsGrid products={data.docs} lang={lang} />
		</div>
	);
}
