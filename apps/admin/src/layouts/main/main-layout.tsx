import type { ReactNode } from "react";

import { Header } from "./header";
import { NavPane } from "./nav-pane";
import * as S from "./styles";

interface I_Authorized {
	children: ReactNode;
}

export const MainLayout = ({ children }: I_Authorized) => {
	return (
		<S.MainLayout>
			<Header />
			<S.MainMiddle>
				<S.MainNav>
					<NavPane />
				</S.MainNav>
				<S.MainContent>{children}</S.MainContent>
			</S.MainMiddle>
			{/* <Footer /> */}
		</S.MainLayout>
	);
};
