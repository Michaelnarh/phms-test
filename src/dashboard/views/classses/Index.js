import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";
import { MdArrowBack } from "react-icons/md";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Hostel Classes" />
				<div className="content-left-side">
					<div>
						<MdArrowBack
							size={40}
							color="var(--darkBlue)"
							onClick={() => navigate(-1)}
						/>
					</div>
					<div>
						<button
							className=" btn mb-1 "
							onClick={() => navigate("/admin/classes/add")}
						>
							ADD Residence Class
						</button>
					</div>
				</div>
				<Outlet />
			</div>
		</>
	);
}
