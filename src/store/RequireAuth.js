import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthStore from "./AuthStore";

const RequireAuth = () => {
	const auth = new AuthStore();
	const location = useLocation();

	return auth.getIsAdmin() ? (
		<Outlet />
	) : auth.getUser() ? (
		<Navigate to="/" state={{ from: location }} replace />
	) : (
		<Navigate to="/admin/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
