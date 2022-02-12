import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { MdNotificationsActive, MdLogout } from "react-icons/md";
import Logo from "../images/logo-knust.png";

export default function Navbar(props) {
	const { isDrawerOpen, func } = props;
	return (
		<>
			<nav>
				<div className="d-nav-flex">
					<ul>
						{/* <img src={Logo} alt="..." style={{ width: 40, height: 50 }} /> */}
						<FaBars
							size={25}
							color="var(--darkBlue)"
							style={{ marginRight: 18 }}
							onClick={() => func(!isDrawerOpen)}
						/>
					</ul>
					<ul className="d-nav-inline-flex">
						<li>
							<MdNotificationsActive size={30} color="var(--darkBlue)" />
						</li>
						<li>
							<MdLogout size={30} color="var(--darkBlue)" />
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
