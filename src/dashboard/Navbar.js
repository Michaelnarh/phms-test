import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SideBar from "./Sidebar";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import Logo from "../images/logo-knust.png";

export default function Navbar(props) {
	// const [isDrawerOpen, setDrawer] = useState(false);
	return (
		<>
			<div className="nav-flex">
				<ul>
					<img src={Logo} alt="..." style={{ width: 40, height: 50 }} />
					<FaBars
						size={25}
						color="var(--darkBlue)"
						style={{ marginRight: 18 }}
						// onClick={() => setDrawer(!isDrawerOpen)}
					/>
				</ul>
				<ul className="nav-inline-flex">
					<li>Sign Up</li>
					<li>Login</li>
					<li className="user">
						<FaUser />
					</li>
					<li>{/* <FaSearch />o */}</li>
				</ul>
			</div>


		</>
	);
}
