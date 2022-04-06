import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";
import { MdArrowBackIos } from "react-icons/md";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Locations" />
				<div className="content-left-side">
					<div>
						<MdArrowBackIos size={30} color="#000" />
					</div>
					<div>
						<button
							className=" btn mb-1 "
							onClick={() => navigate("/admin/locations/add")}
						>
							ADD LOCATION
						</button>
					</div>
				</div>
				<Outlet />
			</div>
		</>
	);
}
