import React from "react";
import { NavLink } from "react-router-dom";
import MenuItems from "./MenuItems";
export default function Drawer(props) {
	return (
		<>
			<ul className="drawer">
				<li className="drawer-item">
					<NavLink
						to="/"
						className={(navData) => (navData.isActive ? "active" : "")}
					>
						Home
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/hostels"
						className={(navData) => (navData.isActive ? "active" : "")}
					>
						Hostels
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/homestel"
						className={(navData) => (navData.isActive ? "active" : "")}
					>
						Hometels
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/help-desk"
						className={(navData) => (navData.isActive ? "active" : "")}
					>
						Help Desk
					</NavLink>
				</li>
			</ul>
		</>
	);
}
