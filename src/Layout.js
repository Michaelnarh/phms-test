import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import { Footer } from "./pages/components/Footer";

export default function Layout(props) {
	return (
		<>
			<div>
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</>
	);
}
