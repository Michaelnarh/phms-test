import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { SideBarItems } from "./Data-items";
export default function Drawer(props) {
	return (
		<>
			<div className="main-drawer">
				<FaTimes size={25} color="var(--mainWhite)" />

				<div className="drawer-columns">
					<div className="dash-user">
						<img
							src="/imgs/adom_bi.jpg"
							className="img-fluid"
							style={{ width: 50, height: 50, borderRadius: "50%" }}
							alt="..."
						/>
						<h6>Francis Kumi</h6>
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
