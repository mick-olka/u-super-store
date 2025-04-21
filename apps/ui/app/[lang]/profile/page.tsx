import type { PageProps } from "@/shared/models";
import { ProfilePage } from "./profile";

type Props = PageProps<object>;

export default async function Profile({ params }: Props) {
	const { lang } = await params;
	return <ProfilePage lang={lang} />;
}
