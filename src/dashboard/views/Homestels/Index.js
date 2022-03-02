import React from "react";
import { Outlet } from "react-router-dom";
import Toptitle from "../TopTitle";

export default function Index(props) {
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Homestels" />
				<div className="content-left-side">
					<button className=" btn mb-1 ">ADD HOMESTELS</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
