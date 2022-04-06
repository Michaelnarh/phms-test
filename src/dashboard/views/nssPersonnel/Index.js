import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";
import { MdArrowBack } from "react-icons/md";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="NSS Personnels" />
				<div className="content-left-side">
					<MdArrowBack
						size={40}
						color="var(--darkBlue)"
						onClick={() => navigate(-1)}
					/>
					<button
						className=" btn mb-1 "
						onClick={() => navigate("/admin/nss-personnels/add")}
					>
						ADD Personnel
					</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
