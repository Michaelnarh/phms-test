import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
	return (
		<>
			<div className="nav-flex">
				<ul>PHMS</ul>
				<ul className="nav-inline-flex">
					<li>
						<NavLink
							to="/"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/hostels"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Hostels
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/homestel"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Hometels
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/help-desk"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Help Desk
						</NavLink>
					</li>
				</ul>
				<ul className="nav-inline-flex">
					<li>Sign Up</li>
					<li>{/* <FaSearch />o */}</li>
				</ul>
			</div>
		</>
	);
}
