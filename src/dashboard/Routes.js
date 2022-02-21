import { Routes, Route, Navigate } from "react-router-dom";
import DashLayout from "./DashLayout";
import DashBoard from "./views/DashBoard";
import HostelsViews from "./views/Hostels/Index";
import AddHostel from "./views/Hostels/AddHostel";
import Homestels from "./views/Homestels";
import AreaMps from "./views/AreaMPs";
import NssPersonnels from "./views/NssPersonnels";
import SnrTutors from "./views/SnrTutors";
import Facilities from "./views/Facilities";
import NotFoundPage from "./views/404Page";
import Zones from "./views/Zones";
import Hostels from "./views/Hostels/Hostels";

function MainLayout() {
	return (
		<Routes>
			<Route path="/admin" element={<DashLayout />}>
				<Route path="dashboard" element={<DashBoard />} />
				<Route path="hostels" element={<HostelsViews />}>
					<Route index element={<Hostels />} />
					<Route path="add" element={<AddHostel />} />
				</Route>
				<Route path="homestels" element={<Homestels />} />
				<Route path="zones" element={<Zones />} />
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
