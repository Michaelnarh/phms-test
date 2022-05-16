import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { SideBarItems } from "./Data-items";
import { observer } from "mobx-react";
import { AuthService } from "../services/AuthService";
// import Dropdownmenu from "./utils/DropDownMenu";
function Drawer(props) {
	const { setDrawer, isDrawerOpen } = props;
	const authService = new AuthService();
	const [user, setUser] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images/users`;
	const id = localStorage.getItem("dumb");
	const jwt = localStorage.getItem("jwt");
	useEffect(() => {
		if (id && jwt) {
			const fetchUser = async () => {
				try {
					const res = await authService.getUser(id);
					setUser(res.data.user);
				} catch (err) {
					console.log(err);
				}
			};

			!user && fetchUser();
		} else {
			window.location.assign("/admin/login");
		}
	});
	return (
		<>
			<div className="main-drawer">
				<FaTimes
					onClick={() => setDrawer(!isDrawerOpen)}
					style={{ marginLeft: 12 }}
					size={35}
					color="var(--mainWhite)"
				/>

				<div className="drawer-columns">
					<div className="dash-user">
						{user && user.image ? (
							<Link to="/admin/dashboard">
								<img
									src={`${url}/${user.image}`}
									className="img-fluid"
									style={{ width: 60, height: 60, borderRadius: "50%" }}
									alt="..."
								/>
							</Link>
						) : (
							<img
								src={`${url}/profile_pic.jpg`}
								className="img-fluid"
								style={{ width: 90, height: 90, borderRadius: "50%" }}
								alt="..."
							/>
						)}
						<p className="profile_name">
							{user && user.username}
							<br /> {user && user.role}
						</p>
						{/* <p>{user && user.role}</p> */}
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
								onClick={() => setDrawer(!isDrawerOpen)}
							>
								<div className="dash-nav">
									<li className="icon">{item.icon}</li>
									<li className="dash-name">{item.name}</li>
									<li className="">{/* <FaArrowRight /> */}</li>
								</div>
								<div>
									{/* {item.children && (
										<Link to={`${item.children.href}`}>
											<div className="dash-nav">
												<li className="dash-submenu">
													{" "}
													<span>{item.children.icon}</span> {item.children.name}
												</li>
											</div>
										</Link>
									)} */}
								</div>
							</NavLink>
						);
					})}
				</div>
				<div className="sidebar-bottom">
					<MdSettings size={30} color={"var(--mainWhite)"} />
				</div>
			</div>
		</>
	);
}

export default observer(Drawer);
