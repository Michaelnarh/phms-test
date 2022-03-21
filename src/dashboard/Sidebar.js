import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { SideBarItems } from "./Data-items";
import { observer } from "mobx-react";
import { ContextStore } from "./../store/ContextStore";

function Sidebar(props) {
	const { authStore } = useContext(ContextStore);
	// console.log(authStore.getToken());
	console.log(authStore.getUser());
	// console.log(authStore.getIsLoggedIn());
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
									onClick={() => console.log("k")}
								>
									<div
										className="dash-nav"
										id={
											window.location.pathname === item.href ? "bg-active" : ""
										}
									>
										<li className="icon">{item.icon}</li>
										<li className="dash-name">{item.name}</li>
									</div>
								</NavLink>
								<div>
									{item.children && (
										<Link to={`${item.children.href}`}>
											<div className="dash-nav">
												<li className="dash-submenu">
													{" "}
													<span>{item.children.icon}</span> {item.children.name}
												</li>
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
export default observer(Sidebar);
