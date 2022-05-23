import React, { useState } from "react";
import Drawer from "./Drawer";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../images/logo-knust.png";
import LogInModal from "./auth/Login";
import AuthStore from "../../store/AuthStore";
import { AuthService } from "../../services/AuthService";
import { Dropdown } from "react-bootstrap";

export default function Navbar(props) {
	const [isDrawerOpen, setDrawer] = useState(false);
	const [isDropDownOpen, setDropDown] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const auth = new AuthStore();
	const user = auth.getUser();
	const authService = new AuthService();
	const handleLogOut = () => {
		authService.logOut();
		window.location.assign("/");
	};
	return (
		<>
			<nav className="sticky-navbar">
				<div className="nav-flex">
					<ul>
						<NavLink style={{ color: "ButtonText" }} to="/">
							<img src={Logo} alt="..." style={{ width: 40, height: 50 }} />
							KNUST PHMS
						</NavLink>
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
								Homestels
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
					<ul className="nav-inline-flex" style={{ marginRight: 12 }}>
						{auth.getToken() ? (
							<>
								{/* <Dropdown> */}
								<Dropdown.Toggle
									style={{
										backgroundColr: "#ccc",
										color: "#ccc",
										borderRadius: "50%",
										height: 40,
										width: 40,
										marginRight: 40,
									}}
									id="dropdown-basic"
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
									{/* <p>K</p> */}
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
										<li
											className="dropdown-item"
											onClick={() => handleLogOut()}
										>
											Log Out
										</li>
									</div>
								)}

								{/* </Dropdown> */}
							</>
						) : (
							<ul className="nav-inline-flex">
								<li>
									<LogInModal setDrawer={isDrawerOpen} />
									{/* <button
										onClick={() => setIsLogin(true)}
										className="btn text-white"
										setDrawer={isDrawerOpen}
									>
										Log In
									</button> */}
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
				{isDrawerOpen && <Drawer setDrawer={isDrawerOpen} action={setDrawer} />}
			</nav>
		</>
	);
}
