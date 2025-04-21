import type { PageProps } from "@/shared/models";
import { LoginPage } from "./login";

type Props = PageProps<{ _: string }, { _: string }>;

export default async function Login({ params }: Props) {
	const { lang } = await params;

	return <LoginPage lang={lang} />;
}
