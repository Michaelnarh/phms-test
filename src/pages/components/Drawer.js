import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import profile from "../../images/profile_pic.jpg";
export default function Drawer(props) {
	const { setDrawer } = props;
	const [isDropDownOpen, setDropDown] = useState(false);
	return (
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
			<li>
				<Dropdown.Toggle
					id="dropdown-basic"
					onClick={() => setDropDown(!isDropDownOpen)}
				>
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
				</Dropdown.Toggle>
				{isDropDownOpen && (
					<div className="user-dropdown-menu">
						<li
							className="dropdown-item"
							onClick={() => alert("will logout", setDropDown(false))}
						>
							Log Out
						</li>
					</div>
				)}
			</li>
		</ul>
	);
}
