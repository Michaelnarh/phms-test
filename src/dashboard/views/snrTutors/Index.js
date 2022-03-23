import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Senior Tutors" />
				<div className="content-left-side">
					<button
						className=" btn mb-1 "
						onClick={() => navigate("/admin/snr-tutors/add")}
					>
						ADD Tutor
					</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
