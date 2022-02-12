import React from "react";
import { NavLink } from "react-router-dom";
import { SideBarItems } from "./Data-items";

export default function Sidebar(props) {
	return (
		<>
			<div className="main-sidebar">
				<div className="sidebar-columns">
					<div className="dash-user">
						<img
							src="/imgs/adom_bi.jpg"
							className="img-fluid"
							style={{ width: 60, height: 60, borderRadius: "50%" }}
							alt="..."
						/>
						<h3>Francis Kumi</h3>
						<p>Maintainer</p>
						<div className="divider" />
					</div>
					{SideBarItems.map((item) => {
						return (
							<NavLink
								key={item.name}
								to={`${item.href}`}
								className={(navData) =>
									navData.isActive ? "active-sidebar" : ""
								}
							>
								<div className="dash-nav">
									<li className="icon">{item.icon}</li>
									<li className="dash-name">{item.name}</li>
									<li className="">{/* <FaArrowRight /> */}</li>
								</div>
							</NavLink>
						);
					})}
				</div>
				<div className="sidebar-bottom">
					<h6>next page</h6>
				</div>
			</div>
		</>
	);
}
