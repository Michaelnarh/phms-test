import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import Homestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
import Navbar from "./pages/components/Navbar";
import { Footer } from "./pages/components/Footer";
export default function Layout({ children, ...rest }) {
	return (
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
	);
}
