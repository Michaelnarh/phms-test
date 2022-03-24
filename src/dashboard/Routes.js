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
import EditTutor from "./views/snrTutors/EditSnrTutors";

//import nss personnel views
// import NssPersonnels from "./views/NssPersonnels";
import NssPersonnelViews from "./views/nssPersonnel/Index";
import NssPersonnels from "./views/nssPersonnel/NssPersonnels";
import AddPersonnel from "./views/nssPersonnel/AddPersonnel";
import EditPersonnel from "./views/nssPersonnel/EditPersonnel";

import AreaMpViews from "./views/areaMp/Index";
import AreaMps from "./views/areaMp/AreaMps";
import AddMp from "./views/areaMp/AddAreaMp";
import EditMp from "./views/areaMp/EditAreaMP";

import Facilities from "./views/Facilities";
import NotFoundPage from "./views/404Page";

// import Zones Views
import ZonesViews from "./views/zones/Index";
import Zones from "./views/zones/Zones";
import AddZone from "./views/zones/AddZone";
import EditZone from "./views/zones/EditZone";

// import Location Views
import LocationViews from "./views/locations/Index";
import Locations from "./views/locations/Locations";
import AddLocation from "./views/locations/AddLocation";
import EditLocation from "./views/locations/EditLocation";
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
				<Route path="zones" element={<ZonesViews />}>
					<Route index element={<Zones />} />
					<Route path="add" element={<AddZone />} />
					<Route path=":id" element={<EditZone />} />
				</Route>
				<Route path="locations" element={<LocationViews />}>
					<Route index element={<Locations />} />
					<Route path="add" element={<AddLocation />} />
					<Route path=":id" element={<EditLocation />} />
				</Route>
				<Route path="area-mps" element={<AreaMpViews />}>
					<Route index element={<AreaMps />} />
					<Route path="add" element={<AddMp />} />
					<Route path=":slug" element={<EditMp />} />
				</Route>
				<Route path="snr-tutors" element={<SnrTutorsViews />}>
					<Route index element={<SnrTutors />} />
					<Route path="add" element={<AddSnrTutors />} />
					<Route path=":slug" element={<EditTutor />} />
				</Route>
				<Route path="nss-personnels" element={<NssPersonnelViews />}>
					<Route index element={<NssPersonnels />} />
					<Route path="add" element={<AddPersonnel />} />
					<Route path=":slug" element={<EditPersonnel />} />
				</Route>
				<Route path="facilities" element={<Facilities />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default MainLayout;
