import React, { useState } from "react";
import Drawer from "./Drawer";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../images/logo-knust.png";
import profile from "../../images/profile_pic.jpg";
import LogInModal from "./auth/Login";
import AuthStore from "../../store/AuthStore";

export default function Navbar(props) {
	const [isDrawerOpen, setDrawer] = useState(false);
	const auth = new AuthStore();
	return (
		<>
			<nav className="sticky-navbar">
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
								className={(navData) => (navData.isActive ? "nav-active" : "")}
							>
								Hostels
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/homestels"
								className={(navData) => (navData.isActive ? "nav-active" : "")}
							>
								Hometels
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/help-desk"
								className={(navData) => (navData.isActive ? "nav-active" : "")}
							>
								Help Desk
							</NavLink>
						</li>
					</ul>
					<ul className="mr-3">
						{auth.getToken() ? (
							<img
								src={profile}
								alt="..."
								style={{
									width: 40,
									height: 40,
									borderRadius: "50%",
									marginRight: 14,
								}}
							/>
						) : (
							<ul className="nav-inline-flex">
								<li>
									<LogInModal />
								</li>
							</ul>
						)}
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
				{isDrawerOpen && <Drawer setDrawer={isDrawerOpen} />}
			</nav>
		</>
	);
}
