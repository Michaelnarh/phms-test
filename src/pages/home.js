import React from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

export default function Home(props) {
	return (
		<>
			<Banner />
		</>
	);
}
