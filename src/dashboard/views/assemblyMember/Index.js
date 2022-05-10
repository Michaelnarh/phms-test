import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toptitle from "../TopTitle";
import { MdArrowBack } from "react-icons/md";

export default function Index(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Assembly Members " />
				<div className="content-left-side">
					<MdArrowBack
						size={40}
						color="var(--darkBlue)"
						onClick={() => navigate(-1)}
					/>
					<button
						className=" btn mb-1 "
						onClick={() => navigate("/admin/assembly-members/add")}
					>
						ADD ASS. MAN
					</button>
				</div>
				<Outlet />
			</div>
		</>
	);
}
