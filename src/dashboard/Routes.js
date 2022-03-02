import { Routes, Route, Navigate } from "react-router-dom";
import DashLayout from "./DashLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import DashBoard from "./views/DashBoard";
import HostelsViews from "./views/Hostels/Index";
import HomestelsViews from "./views/Homestels/Index";
import Hostels from "./views/Hostels/Hostels";
import AddHostel from "./views/Hostels/AddHostel";
import ShowHostel from "./views/Hostels/ShowHostel";
// import Homestels from "./views/Homestels";
import Homestels from "./views/Homestels/Homestel";
import AreaMps from "./views/AreaMPs";
import NssPersonnels from "./views/NssPersonnels";
import SnrTutors from "./views/SnrTutors";
import Facilities from "./views/Facilities";
import NotFoundPage from "./views/404Page";
import Zones from "./views/Zones";

function MainLayout() {
	return (
		<Routes>
			<Route path="/admin/login" element={<Login />} />
			<Route path="/admin/register" element={<Register />} />
			<Route path="/admin" element={<DashLayout />}>
				<Route path="dashboard" element={<DashBoard />} />
				<Route path="hostels" element={<HostelsViews />}>
					<Route index element={<Hostels />} />
					<Route path="add" element={<AddHostel />} />
					<Route path="show/:id" element={<ShowHostel />} />
				</Route>
				<Route path="homestels" element={<HomestelsViews />}>
					<Route index element={<Homestels />} />
				</Route>
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
