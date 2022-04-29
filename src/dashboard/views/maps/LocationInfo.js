import React from "react";

export default function Locationinfobox({ info }) {
	return (
		<>
			<div className="location-info-dash">
				<h5>name:{info.name}</h5>
				<h5>descripton:{info.title}</h5>
				<ul>
					<li>somthing here </li>
				</ul>
			</div>
		</>
	);
}
