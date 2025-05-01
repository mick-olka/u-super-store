import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "src/hooks";
import { ROUTES } from "src/routing";
import { useAuthStore } from "src/store";
import * as S from "./styles";
export const Header = () => {
	const { logout: logoutClient, isSuccess } = useLogout();
	const router = useNavigate();
	const { logout } = useAuthStore();

	const handleLogoutClick = () => {
		logout();
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isSuccess) {
			logoutClient();
			router(ROUTES.login);
		}
	}, [isSuccess]);

	return (
		<S.MainHeader>
			<S.HeaderText>
				<Link to={ROUTES.home}>Store.ua: адміністратор</Link>
			</S.HeaderText>
			<Button onClick={handleLogoutClick}>Вихід</Button>
		</S.MainHeader>
	);
};
