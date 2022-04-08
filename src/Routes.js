import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashLayout from "./dashboard/DashLayout";
import Login from "./dashboard/views/auth/Login";
import Register from "./dashboard/views/auth/Register";
import DashBoard from "./dashboard/views/DashBoard";

//import of hostel views
import HostelsViews from "./dashboard/views/hostels/Index";
import Hostels from "./dashboard/views/hostels/Hostels";
import AddHostel from "./dashboard/views/hostels/AddHostel";
import ShowHostel from "./dashboard/views/hostels/ShowHostel";

// import of Homestel views
import HomestelsViews from "./dashboard/views/homestels/Index";
import Homestels from "./dashboard/views/homestels/Homestel";
import AddHomestel from "./dashboard/views/homestels/AddHomestel";

import SnrTutorsViews from "./dashboard/views/snrTutors/Index";
import SnrTutors from "./dashboard/views/snrTutors/SnrTutors";
import AddSnrTutors from "./dashboard/views/snrTutors/AddSnrTutor";
import EditTutor from "./dashboard/views/snrTutors/EditSnrTutors";

//import nss personnel views
// import NssPersonnels from "./views/NssPersonnels";
import NssPersonnelViews from "./dashboard/views/nssPersonnel/Index";
import NssPersonnels from "./dashboard/views/nssPersonnel/NssPersonnels";
import AddPersonnel from "./dashboard/views/nssPersonnel/AddPersonnel";
import EditPersonnel from "./dashboard/views/nssPersonnel/EditPersonnel";

import AreaMpViews from "./dashboard/views/areaMp/Index";
import AreaMps from "./dashboard/views/areaMp/AreaMps";
import AddMp from "./dashboard/views/areaMp/AddAreaMp";
import EditMp from "./dashboard/views/areaMp/EditAreaMP";

import Facilities from "./dashboard/views/Facilities";
import NotFoundPage from "./dashboard/views/404Page";

// import Zones Views
import ZonesViews from "./dashboard/views/zones/Index";
import Zones from "./dashboard/views/zones/Zones";
import AddZone from "./dashboard/views/zones/AddZone";
import EditZone from "./dashboard/views/zones/EditZone";

// import Location Views
import LocationViews from "./dashboard/views/locations/Index";
import Locations from "./dashboard/views/locations/Locations";
import AddLocation from "./dashboard/views/locations/AddLocation";
import EditLocation from "./dashboard/views/locations/EditLocation";

// import of public routes
import Layout from "./Layout";
import Home from "./pages/Home";
import Uhostels from "./pages/Hostels";
import Uhomestels from "./pages/Hostels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
//import navigatin routes

import { ContextStore } from "./store/ContextStore";

function MainLayout() {
	const { authStore } = useContext(ContextStore);
	let token = authStore.getToken();
	let user = authStore.getUser();
	console.log(user, token);
	return (
		<Routes>
			{/* these are the public routes */}
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="hostels" element={<Uhostels />} />
				<Route path="homestels" element={<Uhomestels />} />
				<Route path="homestels/:slug" element={<ResidenceDetails />} />
				<Route path="hostels/:slug" element={<ResidenceDetails />} />
				<Route path="help-desk" element={<HelpDesk />} />
			</Route>

			{/* these are the admin routes */}
			<Route path="/admin/login" element={<Login />} />
			<Route path="/admin/register" element={<Register />} />

			<Route path="/admin" element={<DashLayout />}>
				<Route path="dashboard" element={<DashBoard />} />
				<Route path="hostels" element={<HostelsViews />}>
					<Route index element={<Hostels />} />
					<Route path="add" element={<AddHostel />} />
					<Route path="details/:slug" element={<ShowHostel />} />
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
