import { Routes, Route, Navigate } from "react-router-dom";
import DashLayout from "./DashLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import DashBoard from "./views/DashBoard";

//import of hostel views
import HostelsViews from "./views/hostels/Index";
import Hostels from "./views/hostels/Hostels";
import AddHostel from "./views/hostels/AddHostel";
import ShowHostel from "./views/hostels/ShowHostel";

// import of Homestel views
import HomestelsViews from "./views/homestels/Index";
import Homestels from "./views/homestels/Homestel";
import AddHomestel from "./views/homestels/AddHomestel";

import SnrTutorsViews from "./views/snrTutors/Index";
import SnrTutors from "./views/snrTutors/SnrTutors";
import AddSnrTutors from "./views/snrTutors/AddSnrTutor";
// import EditTutors from "./views/snrTutors/EditSnrTutors";

import AreaMps from "./views/AreaMPs";
import NssPersonnels from "./views/NssPersonnels";
import Facilities from "./views/Facilities";
import NotFoundPage from "./views/404Page";
import Zones from "./views/Zones";

//import navigatin routes

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
					<Route path="details/:id" element={<ShowHostel />} />
				</Route>
				<Route path="homestels" element={<HomestelsViews />}>
					<Route index element={<Homestels />} />
				</Route>
				<Route path="zones" element={<Zones />} />
				<Route path="area-mps" element={<AreaMps />} />
				<Route path="snr-tutors" element={<SnrTutorsViews />}>
					<Route index element={<SnrTutors />} />
					<Route path="add" element={<AddSnrTutors />} />
				</Route>
				<Route path="nss-personnels" element={<NssPersonnels />} />
				<Route path="facilities" element={<Facilities />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default MainLayout;
