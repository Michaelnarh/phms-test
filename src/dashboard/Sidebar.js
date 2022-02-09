import React from "react";
import {
	FaUser,
	FaHome,
	FaUserCheck,
	FaSignal,
	FaBuffer,
	FaHive,
} from "react-icons/fa";
const items = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: <FaSignal size={25} />,
	},
	{
		name: "Hostels",
		href: "/hostels",
		icon: <FaHome size={25} />,
	},
	{
		name: "Homestels",
		href: "/homestels",
		icon: <FaBuffer size={25} />,
	},
	{
		name: "Senior Tutors",
		href: "/snr-tutors",
		icon: <FaUserCheck size={25} />,
	},
	{
		name: "NSS Personnels",
		href: "/nss-personnel",
		icon: <FaHive size={25} />,
	},
	{
		name: "Area MP",
		href: "area-mp",
		icon: <FaUser size={25} />,
	},
	{
		name: "National MP",
		href: "/national-mp",
		icon: <FaUser size={25} />,
	},
	{
		name: "Hostel Facilities",
		href: "/facilities",
		icon: <FaUser size={25} />,
	},
];
export default function Sidebar(props) {
	return (
		<>
			<div className="main-sidebar">
				<div className="sidebar-columns">
					<div className="dash-user">
						<img
							src="/imgs/adom_bi.jpg"
							className="img-fluid"
							style={{ width: 60, height: 60, borderRadius: "50%" }}
							alt="..."
						/>
						<h3>Francis Kumi</h3>
						<p>Maintainer</p>
						<div className="divider" />
					</div>
					{items.map((item) => {
						return (
							<>
								<div className="dash-nav">
									<li className="icon">{item.icon}</li>
									<li className="dash-name">{item.name}</li>
									<li className="">{/* <FaArrowRight /> */}</li>
								</div>
							</>
						);
					})}
				</div>
				<div className="sidebar-bottom">
					<h6>next page</h6>
				</div>
			</div>
		</>
	);
}
