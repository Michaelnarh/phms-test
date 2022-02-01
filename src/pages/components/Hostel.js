import React from "react";
import adombi from "../../images/adom_bi.jpg";
import { MdLocationOn } from "react-icons/md";
export default function Hostel(props) {
	return (
		<>
			<div>
				<img
					src={adombi}
					alt="..."
					style={{ height: "200px", width: "300px" }}
				/>
				<h5>Adom Bi Hostel</h5>
				<ul>
					<p>
						<b>
							{" "}
							<MdLocationOn />
							Location:
						</b>
						<span>Ayeduase</span>
					</p>
					<p>
						<b>Distance: </b>
						<span>2.3km</span>
					</p>
				</ul>
			</div>
		</>
	);
}
