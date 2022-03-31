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
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import Homestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
import Navbar from "./pages/components/Navbar";
import { Routes, Route, useMatch } from "react-router-dom";
import { Footer } from "./pages/components/Footer";
import { Provider } from "mobx-react";
import DashLayout from "./dashboard/Routes";
import Store from "./Store";
import { ContextStore } from "./store/ContextStore";

function App() {
	const { authStore } = useContext(ContextStore);
	let match = useMatch("/admin");
	let token = authStore.getToken();
	const user = false;
	return (
		<>
			{token && <DashLayout />}
			<>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/hostels" element={<Hostels />} />
					<Route path="/homestels" element={<Homestels />} />
					<Route path="/homestels/:slug" element={<ResidenceDetails />} />
					<Route path="/hostels/:slug" element={<ResidenceDetails />} />
					<Route path="/help-desk" element={<HelpDesk />} />
				</Routes>
				<Footer />
			</>
		</>
	);
}

export default App;
