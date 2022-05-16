import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthStore from "./AuthStore";
import { AuthService } from "../services/AuthService";

const RequireAuth = () => {
	const auth = new AuthStore();
	const authService = new AuthService();
	const location = useLocation();
	authService.authVerify(auth.getToken());
	return auth.getIsAdmin() ? (
		<Outlet />
	) : auth.getUser() ? (
		<Navigate to="/" state={{ from: location }} replace />
	) : (
		<Navigate to="/admin/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
