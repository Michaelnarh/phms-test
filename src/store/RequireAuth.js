import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthStore from "./AuthStore";
const allowedRoles = ["admin", "supervisor", "maintainer"];

const RequireAuth = () => {
	const auth = new AuthStore();
	const location = useLocation();

	return isAdmin ? (
		<Outlet />
	) : auth.getUser ? (
		<Navigate to="/" state={{ from: location }} replace />
	) : (
		<Navigate to="/admin/login" state={{ from: location }} replace />
	);
};

const isAdmin = () => {
	const auth = new AuthStore();
	const user = auth.getUser;
	return allowedRoles.includes(user?.role);
};

export default RequireAuth;
