import React from "react";
import Banner from "./components/Banner";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home(props) {
	return (
		<>
			<Navbar />
			<Banner />
			<Footer />
		</>
	);
}
