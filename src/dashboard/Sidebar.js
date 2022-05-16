import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { SideBarItems } from "./Data-items";
import { observer } from "mobx-react";
import { AuthService } from "../services/AuthService";
import Dropdownmenu from "./utils/DropDownMenu";
import { ContextStore } from "./../store/ContextStore";

function Sidebar(props) {
	const authService = new AuthService();
	const { authStore } = useContext(ContextStore);
	const url = `${process.env.REACT_APP_API_URL}/images/users`;
	const id = authStore.getId();
	const jwt = authStore.getToken();
	const user = authStore.getUser();

	useEffect(() => {
		if (id && jwt) {
			const fetchUser = async () => {
				try {
					await authService.getUser(id);

					console.log(user);
				} catch (err) {
					console.log(err.message);
				}
			};

			!user && fetchUser();
			authService.authVerify(jwt);
		} else {
			window.location.assign("/admin/login");
		}
		// authService.authVerify(jwt);
	});

	return (
		<>
			<div className="main-sidebar">
				<div className="sidebar-columns">
					<div className="dash-user">
						{user && user?.image ? (
							<img
								src={`${url}/${user.image}`}
								className="img-fluid"
								style={{ width: 60, height: 60, borderRadius: "50%" }}
								alt="..."
							/>
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
							<div key={item.name}>
								<NavLink
									to={`${item.href}`}
									className={(navData) =>
										navData.isActive ? "active-sidebar" : ""
									}
								>
									<div className="dash-nav">
										<li className="icon">{item.icon}</li>
										<li className="dash-name">{item.name}</li>
									</div>
								</NavLink>
								<div>
									{item.children && (
										<Dropdownmenu item={item} isActive={false} />
									)}
								</div>
							</div>
						);
					})}
				</div>
				<div className="sidebar-bottom">
					<MdSettings size={50} color={"var(--mainWhite)"} />
					<ul>
						{/* <li>Settings</li> */}
						{/* <li>SuperLax Tech</li> */}
						{/* <li>{y.getFullYear()}</li> */}
					</ul>
				</div>
			</div>
		</>
	);
}
export default observer(Sidebar);
