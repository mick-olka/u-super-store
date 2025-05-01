import type { PageProps } from "@/shared/models";

import { RegisterPage } from "./register";

export default async function Register({ params }: PageProps<object>) {
	const { lang } = await params;
	return <RegisterPage lang={lang} />;
}
