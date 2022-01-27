import React from "react";
// import { FaSearch } from "react-fontawesome/fa";

export default function Navbar(props) {
	return (
		<>
			<div className="nav-flex">
				<ul>PHMS</ul>
				<ul className="nav-inline-flex">
					<li className="active">Home</li>
					<li>Hostels</li>
					<li>Hometels</li>
					<li>Help Desk</li>
				</ul>
				<ul className="nav-inline-flex">
					<li>Sign Up</li>
					<li>{/* <FaSearch /> */}o</li>
				</ul>
			</div>
		</>
	);
}
