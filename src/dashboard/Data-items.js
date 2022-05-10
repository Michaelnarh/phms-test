import React from "react";
import {
	FaHome,
	FaUserCheck,
	FaSignal,
	FaBuffer,
	FaHive,
	FaPlus,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";
import {
	IoIosFingerPrint,
	IoMdCog,
	IoIosLocate,
	IoIosPerson,
	IoIosStar,
} from "react-icons/io";
export const SideBarItems = [
	{
		name: "Dashboard",
		href: "dashboard",
		icon: <FaSignal size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Residences",
		href: "residences",
		icon: <FaHome size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Hostel",
			href: "hostels/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	// {
	// 	name: "Homestels",
	// 	href: "homestels",
	// 	icon: <FaBuffer size={20} color="var(--mainWhite)" />,
	// 	children: {
	// 		name: "Add Homestel",
	// 		href: "homestels/add",
	// 		icon: <FaPlus size={10} color="var(--mainWhite)" />,
	// 	},
	// },
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
		name: "Locations",
		href: "locations",
		icon: <IoIosLocate size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Location",
			href: "locations/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "R Classes",
		href: "classes",
		icon: <FaBuffer size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Location",
			href: "classes/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "R Facilities",
		href: "facilities",
		icon: <IoMdCog size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Hostel",
			href: "facilities/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Registration",
		href: "registration",
		icon: <IoIosFingerPrint size={20} color="var(--mainWhite)" />,
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
		name: "Student MPs",
		href: "student-mps",
		icon: <IoIosPerson size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add Area-Mp",
			href: "student-mps/add",
			icon: <FaPlus size={10} color="var(--mainWhite)" />,
		},
	},
	{
		name: "Assembly Memb.",
		href: "assembly-members",
		icon: <IoIosStar size={20} color="var(--mainWhite)" />,
		children: {
			name: "Add A. Member",
			href: "assembly-members/add",
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
		name: "Reports",
		href: "reports",
		icon: <AiFillWindows size={20} color="var(--mainWhite)" />,
	},
];
