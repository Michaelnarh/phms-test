import React from "react";
import { Outlet } from "react-router-dom";
import Toptitle from "../TopTitle";

export default function Index(props) {
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="NSS Personnels" />
				<div className="content-left-side">
					<button className=" btn mb-1 ">ADD Personnel</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
