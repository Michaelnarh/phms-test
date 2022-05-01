import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "./dashboard/DashLayout";
import Login from "./dashboard/views/auth/Login";
import Register from "./dashboard/views/auth/Register";
import DashBoard from "./dashboard/views/DashBoard";

//import of hostel views
import ResidenceViews from "./dashboard/views/Residence/ResidenceIndex";
import Residences from "./dashboard/views/Residence/Residences";
import AddResidence from "./dashboard/views/Residence/AddResidence";
import EditResidence from "./dashboard/views/Residence/EditResidence";
import ShowResidence from "./dashboard/views/Residence/ShowResidence";

// import of Homestel views
// import HomestelsViews from "./dashboard/views/homestels/Index";
// import Homestels from "./dashboard/views/homestels/Homestel";
// import AddHomestel from "./dashboard/views/homestels/AddHomestel";

// import senior tutors views
import SnrTutorsViews from "./dashboard/views/snrTutors/Index";
import SnrTutors from "./dashboard/views/snrTutors/SnrTutors";
import AddSnrTutors from "./dashboard/views/snrTutors/AddSnrTutor";
import EditTutor from "./dashboard/views/snrTutors/EditSnrTutors";
import ShowTutor from "./dashboard/views/snrTutors/ShowTutor";

//import nss personnel views
// import NssPersonnels from "./views/NssPersonnels";
import NssPersonnelViews from "./dashboard/views/nssPersonnel/Index";
import NssPersonnels from "./dashboard/views/nssPersonnel/NssPersonnels";
import AddPersonnel from "./dashboard/views/nssPersonnel/AddPersonnel";
import EditPersonnel from "./dashboard/views/nssPersonnel/EditPersonnel";

// import area mps views
import AreaMpViews from "./dashboard/views/areaMp/Index";
import AreaMps from "./dashboard/views/areaMp/AreaMps";
import AddAreaMp from "./dashboard/views/areaMp/AddAreaMP";
import EditMp from "./dashboard/views/areaMp/EditAreaMP";

// import facilities views
import FacilityViews from "./dashboard/views/facility/Index";
import Facilities from "./dashboard/views/facility/Facilities";
import AddFacility from "./dashboard/views/facility/AddFacility";
import EditFacility from "./dashboard/views/facility/EditFacility";

//import classes views
import ClassViews from "./dashboard/views/classses/Index";
import Classes from "./dashboard/views/classses/AllClasses";
import AddClass from "./dashboard/views/classses/AddClass";
import EditClass from "./dashboard/views/classses/EditClass.";

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

import RegistrationViews from "./dashboard/views/Registration/Index";
import RegisterTable from "./dashboard/views/Registration/RegisterTable";
import RegisteredTable from "./dashboard/views/Registration/ResgiteredTable";

import Reports from "./dashboard/views/Reports/Reports";

import NotFoundPage from "./dashboard/views/404Page";

// import of public routes
import Layout from "./Layout";
import Home from "./pages/Home";
import Uhostels from "./pages/Hostels";
import Uhomestels from "./pages/Homestels";
import ResidenceDetails from "./pages/ResidenceDetails";
import HelpDesk from "./pages/HelpDesk";
//import navigatin routes

import { ContextStore } from "./store/ContextStore";
import RequireAuth from "./store/RequireAuth";

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

			<Route element={<RequireAuth />}>
				<Route path="/admin/register" element={<Register />} />
				<Route path="/admin" element={<DashLayout />}>
					<Route path="dashboard" element={<DashBoard />} />
					<Route path="residences" element={<ResidenceViews />}>
						<Route index element={<Residences />} />
						<Route path="add" element={<AddResidence />} />
						<Route path="details/:slug" element={<ShowResidence />} />
						<Route path=":slug/edit" element={<EditResidence />} />
					</Route>
					{/* <Route path="homestels" element={<HomestelsViews />}>
						<Route index element={<Homestels />} />
					</Route> */}
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
						<Route path="add" element={<AddAreaMp />} />
						<Route path=":slug" element={<EditMp />} />
					</Route>
					<Route path="snr-tutors" element={<SnrTutorsViews />}>
						<Route index element={<SnrTutors />} />
						<Route path="add" element={<AddSnrTutors />} />
						<Route path=":slug" element={<ShowTutor />} />
						<Route path=":slug/edit" element={<EditTutor />} />
					</Route>
					<Route path="nss-personnels" element={<NssPersonnelViews />}>
						<Route index element={<NssPersonnels />} />
						<Route path="add" element={<AddPersonnel />} />
						<Route path=":slug" element={<EditPersonnel />} />
					</Route>
					<Route path="facilities" element={<FacilityViews />}>
						<Route index element={<Facilities />} />
						<Route path="add" element={<AddFacility />} />
						<Route path=":id" element={<EditFacility />} />
					</Route>
					<Route path="classes" element={<ClassViews />}>
						<Route index element={<Classes />} />
						<Route path="add" element={<AddClass />} />
						<Route path=":id" element={<EditClass />} />
					</Route>
					<Route path="registration" element={<RegistrationViews />}>
						<Route index element={<RegisterTable />} />
						<Route path="registered" element={<RegisteredTable />} />
					</Route>
					<Route path="reports" element={<Reports />}>
						<Route index element={<Reports />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default MainLayout;
