import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import Homestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
import Navbar from "./pages/components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./pages/components/Footer";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hostels" element={<Hostels />} />
				<Route path="/homestels" element={<Homestels />} />
				<Route path="/homestels/:id" element={<ResidenceDetails />} />
				<Route path="/hostels/:id" element={<ResidenceDetails />} />
				<Route path="/help-desk" element={<HelpDesk />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
