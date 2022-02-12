import { Routes, Route, Navigate } from "react-router-dom";
import DashLayout from "./DashLayout";
import DashBoard from "./views/DashBoard";
import Hostels from "./views/Hostels";
import Homestels from "./views/Homestels";
import AreaMps from "./views/AreaMPs";
import NssPersonnels from "./views/NssPersonnels";
import SnrTutors from "./views/SnrTutors";
import Facilities from "./views/Facilities";
import NotFoundPage from "./views/404Page";

function MainLayout() {
	return (
		<Routes>
			<Route path="/admin" element={<DashLayout />}>
				<Route path="dashboard" element={<DashBoard />} />
				<Route path="hostels" element={<Hostels />} />
				<Route path="homestels" element={<Homestels />} />
				<Route path="area-mps" element={<AreaMps />} />
				<Route path="snr-tutors" element={<SnrTutors />} />
				<Route path="nss-personnels" element={<NssPersonnels />} />
				<Route path="facilities" element={<Facilities />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default MainLayout;
