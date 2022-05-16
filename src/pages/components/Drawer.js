import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import profile from "../../images/profile_pic.jpg";
import AuthStore from "../../store/AuthStore";
import LogInModal from "./auth/Login";
export default function Drawer(props) {
	const { setDrawer } = props;
	const auth = new AuthStore();
	const user = auth.getUser();
	const [isDropDownOpen, setDropDown] = useState(false);
	const handleLogOut = () => {
		localStorage.removeItem("dumb");
		localStorage.removeItem("user");
		localStorage.removeItem("id");
		localStorage.removeItem("jwt");
		setDropDown(false);
		window.location.assign("/");
	};
	return (
		<ul className="drawer">
			<li className="drawer-item">
				<NavLink
					to="/"
					className={(navData) => (navData.isActive ? "active" : "")}
					onClick={() => setDrawer(false)}
					style={{ color: "#fff" }}
				>
					Home
				</NavLink>
			</li>
			<li className="drawer-item">
				<NavLink
					to="/hostels"
					className={(navData) => (navData.isActive ? "active" : "")}
					onClick={() => setDrawer(false)}
					style={{ color: "#fff" }}
				>
					Hostels
				</NavLink>
			</li>
			<li className="drawer-item">
				<NavLink
					to="/homestels"
					style={{ color: "#fff" }}
					className={(navData) => (navData.isActive ? "active" : "")}
					onClick={() => setDrawer(false)}
				>
					Homestels
				</NavLink>
			</li>
			<li className="drawer-item">
				<NavLink
					to="/help-desk"
					style={{ color: "#fff" }}
					className={(navData) => (navData.isActive ? "active" : "")}
					onClick={() => setDrawer(false)}
				>
					Help Desk
				</NavLink>
			</li>
			<ul>
				{auth.getToken() ? (
					<>
						<Dropdown.Toggle
							// id="dropdown-basic"
							style={{
								backgroundColr: "#ccc",
								color: "#ccc",
								borderRadius: "50%",
								height: 40,
								width: 40,
								marginRight: 40,
								marginBottom: 12,
							}}
							onClick={() => setDropDown(!isDropDownOpen)}
						>
							{/* <img
								src={profile}
								alt="..."
								style={{
									width: 40,
									height: 40,
									borderRadius: "50%",
									marginRight: 14,
								}}
							/> */}
							{/* <p>K</p>
							 */}
							{user ? (
								// <div className="user-circle">
								<p className="user-text">{user.username.split("")[0]}</p>
							) : (
								// </div>
								""
							)}
						</Dropdown.Toggle>
						{isDropDownOpen && (
							<div className="user-dropdown-menu">
								<li className="dropdown-item" onClick={() => handleLogOut()}>
									Log Out
								</li>
							</div>
						)}
					</>
				) : (
					<LogInModal func={setDrawer} />
				)}
			</ul>
		</ul>
	);
}
