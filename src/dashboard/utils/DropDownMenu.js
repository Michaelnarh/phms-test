import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Dropdownmenu(props) {
	// const { isActive, setActive } = userState(false);
	const { item, isActive } = props;
	return (
		<>
			{isActive ? (
				<Link to={`${item.children.href}`}>
					<div className="dash-nav">
						<li className="dash-submenu">
							{" "}
							<span>{item.children.icon}</span> {item.children.name}
						</li>
					</div>
				</Link>
			) : null}
		</>
	);
}
