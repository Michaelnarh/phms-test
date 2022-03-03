import React from "react";
import { NavLink } from "react-router-dom";
export default function Drawer(props) {
	const { setDrawer } = props;
	return (
		<>
			<ul className="drawer">
				<li className="drawer-item">
					<NavLink
						to="/"
						className={(navData) => (navData.isActive ? "active" : "")}
						onClick={() => setDrawer(false)}
					>
						Home
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/hostels"
						className={(navData) => (navData.isActive ? "active" : "")}
						onClick={() => setDrawer(false)}
					>
						Hostels
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/homestels"
						className={(navData) => (navData.isActive ? "active" : "")}
						onClick={() => setDrawer(false)}
					>
						Hometels
					</NavLink>
				</li>
				<li className="drawer-item">
					<NavLink
						to="/help-desk"
						className={(navData) => (navData.isActive ? "active" : "")}
						onClick={() => setDrawer(false)}
					>
						Help Desk
					</NavLink>
				</li>
			</ul>
		</>
	);
}
