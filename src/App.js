import "./App.css";
import "./dashboard/dashStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
/***
 * import from the dashboard
 */
import DashNav from "./dashboard/DashLayout";

/**
 * import of guest/regular users pages
 */
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import Homestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
import Navbar from "./pages/components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./pages/components/Footer";
import { Provider } from "mobx-react";
import DashLayout from "./dashboard/Routes";
import Store from "./Store";

function App() {
	return (
		<>
			<Provider store={Store}>
				<DashLayout />
			</Provider>
			{/* {/* <Navbar /> */}
			{/* <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hostels" element={<Hostels />} />
				<Route path="/homestels" element={<Homestels />} />
				<Route path="/homestels/:id" element={<ResidenceDetails />} />
				<Route path="/hostels/:id" element={<ResidenceDetails />} />
				<Route path="/help-desk" element={<HelpDesk />} />
			</Routes>
			<Footer />  */}
		</>
	);
}

export default App;
