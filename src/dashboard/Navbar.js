import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdNotificationsActive, MdLogout } from "react-icons/md";
import Logo from "../images/logo-knust.png";

export default function Navbar(props) {
	const [isLoading, setIsLoading] = useState(false);
	const handleLogOut = () => {
		setIsLoading(true);
		console.log("logging out");
		// const timer = setTimeout(() => {
		localStorage.removeItem("dumb");
		localStorage.removeItem("user");
		localStorage.removeItem("id");
		localStorage.removeItem("jwt");
		// }, 5000);

		// clearTimeout(timer);
		window.location.assign("/admin/login");
		setIsLoading(false);
	};
	const { isDrawerOpen, func } = props;
	return (
		<>
			<nav>
				<div className="d-nav-flex">
					<ul>
						<li>
							<img
								className="dash-logo"
								src={Logo}
								alt="..."
								style={{ width: 40, height: 50 }}
							/>
						</li>
						<li>
							<FaBars
								size={25}
								color="var(--darkBlue)"
								style={{ marginRight: 18 }}
								className="FaBars-display"
								onClick={() => func(!isDrawerOpen)}
							/>
						</li>
					</ul>
					<ul className="d-nav-inline-flex">
						<li>
							<MdNotificationsActive size={30} color="var(--darkBlue)" />
						</li>
						<li>
							<MdLogout
								size={30}
								onClick={() => handleLogOut()}
								color="var(--darkBlue)"
							/>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
