import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import Homestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import Navbar from "./pages/components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hostels" element={<Hostels />} />
				<Route path="/homestels" element={<Homestels />} />
				<Route path="hostels/:id" element={<ResidenceDetails />} />
			</Routes>
		</>
	);
}

export default App;
