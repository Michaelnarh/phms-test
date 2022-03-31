import {
	FaUser,
	FaHome,
	FaUserCheck,
	FaSignal,
	FaBuffer,
	FaHive,
	FaPlus,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
export const SideBarItems = [
	{
		name: "Dashboard",
		href: "dashboard",
		icon: <FaSignal size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Hostels",
		href: "hostels",
		icon: <FaHome size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Hostel",
			href: "hostels/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Homestels",
		href: "homestels",
		icon: <FaBuffer size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Homestel",
			href: "homestels/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Zones",
		href: "zones",
		icon: <MdLocationOn size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Zone",
			href: "zones/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Senior Tutors",
		href: "snr-tutors",
		icon: <FaUserCheck size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Tutor",
			href: "snr-tutors/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "NSS Personnels",
		href: "nss-personnels",
		icon: <FaHive size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Personnel",
			href: "nss-personnels/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Area MPs",
		href: "area-mps",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Area-Mp",
			href: "area-mps/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "National MPs",
		href: "national-mp",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Hostel",
			href: "national-mp/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Hostel Facilities",
		href: "facilities",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Hostel",
			href: "facilities/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Locations",
		href: "locations",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Location",
			href: "locations/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
];
