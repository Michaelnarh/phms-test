import "./App.css";
import "./dashboard/dashStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
/***
 * import from the dashboard
 */

import React, { useContext } from "react";
// import { Navigate,useLocation } from "react-router-dom";
/**
 * import of guest/regular users pages
 */
import { Provider } from "mobx-react";
import DashLayout from "./dashboard/Routes";
import { Route, Navigate } from "react-router-dom";
import { ContextStore } from "./store/ContextStore";
import Layout from "./Layout";

function App() {
	// const { authStore } = useContext(ContextStore);
	// let token = authStore.getToken();

	return (
		<>
			{<DashLayout />}
			<Layout />
		</>
	);
}

export default App;

export function PrivateRoute({ component: Component, roles, ...rest }) {
	const { authStore } = useContext(ContextStore);
	<Route
		{...rest}
		render={(props) => {
			const currentUser = authStore.getUser();
			const token = authStore.getToken();
			if (!currentUser) {
				// not logged in so redirect to login page with the return url
				Navigate("/admin/login");
			}

			// check if route is restricted by role
			if (token && currentUser.role === "user") {
				// role not authorised so redirect to home page
				Navigate("/");
			}

			// authorised so return component
			return <Component {...props} />;
		}}
	/>;
}
