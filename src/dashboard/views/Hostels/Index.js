import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Hostels" />
				<div className="content-left-side">
					<button
						className=" btn mb-1 "
						onClick={() => navigate("/admin/hostels/add")}
					>
						ADD HOSTEL
					</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
