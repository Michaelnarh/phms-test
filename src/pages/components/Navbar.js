import React, { useState } from "react";
import Drawer from "./Drawer";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import Logo from "../../images/logo-knust.png";

export default function Navbar(props) {
	const [isDrawerOpen, setDrawer] = useState(false);
	return (
		<>
			<div className="nav-flex">
				<ul>
					<img src={Logo} alt="..." style={{ width: 40, height: 50 }} />
					KNUST PHMS
				</ul>
				<ul className="nav-inline-flex">
					<li>
						<NavLink
							to="/"
							className={(navData) => (navData.isActive ? "nav-active" : "")}
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
							to="/homestels"
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
					<li>Login</li>
					<li className="user">
						<FaUser />
					</li>
					<li>{/* <FaSearch />o */}</li>
				</ul>
				<ul className="nav-bars">
					{!isDrawerOpen ? (
						<FaBars
							size={25}
							color="var(--darkBlue)"
							style={{ marginRight: 18 }}
							onClick={() => setDrawer(!isDrawerOpen)}
						/>
					) : (
						<FaTimes
							size={25}
							color="var(--darkBlue)"
							style={{ marginRight: 18 }}
							onClick={() => setDrawer(!isDrawerOpen)}
						/>
					)}
				</ul>
			</div>
			{isDrawerOpen && <Drawer />}
		</>
	);
}
