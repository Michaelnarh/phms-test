import {
	FaUser,
	FaHome,
	FaUserCheck,
	FaSignal,
	FaBuffer,
	FaHive,
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
	},
	{
		name: "Homestels",
		href: "homestels",
		icon: <FaBuffer size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Zones",
		href: "zones",
		icon: <MdLocationOn size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Senior Tutors",
		href: "snr-tutors",
		icon: <FaUserCheck size={20} color="var(--mainWhite)" />,
	},
	{
		name: "NSS Personnels",
		href: "nss-personnels",
		icon: <FaHive size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Area MP",
		href: "area-mps",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
	},
	{
		name: "National MP",
		href: "national-mp",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Hostel Facilities",
		href: "facilities",
		icon: <FaUser size={20} color="var(--mainWhite)" />,
	},
];
