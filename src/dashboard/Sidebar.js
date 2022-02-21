import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SideBarItems } from "./Data-items";

export default function Sidebar(props) {
	const [dropDown, setDropDown] = useState(false);
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
							<div key={item.name}>
								<NavLink
									to={`${item.href}`}
									className={(navData) =>
										navData.isActive ? "active-sidebar" : ""
									}
									onClick={() => setDropDown(true)}
								>
									<div className="dash-nav">
										<li className="icon">{item.icon}</li>
										<li className="dash-name">{item.name}</li>
										<li className="">{/* <FaArrowRight /> */}</li>
									</div>
								</NavLink>
								<div>
									{item.children && dropDown && (
										<Link to={`${item.children.href}`}>
											<div className="dash-nav">
												{/* <li className="icon"> {item.children.icon}</li> */}
												<li className="dash-submenu"> {item.children.name}</li>
											</div>
										</Link>
									)}
								</div>
							</div>
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
