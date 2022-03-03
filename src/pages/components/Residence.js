import React from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdWalk } from "react-icons/io";
import { Link } from "react-router-dom";
import adom from "../../images/adom_bi.jpg";
import banner from "../../images/location_search.png";
export default function Residence(props) {
	const { residence } = props;
	return (
		<>
			<div className="residence">
				<div>
					<Link to={`${residence.name}`}>
						{residence.coverImage ? (
							<img
								src={residence.coverImage}
								alt="..."
								style={{ height: "200px", width: "300px" }}
							/>
						) : (
							<img src={adom} alt="..." style={{ height: 200, width: 300 }} />
						)}
					</Link>
					<h5 className="text-center r-name">
						<Link to={`${residence.name}`}>{residence.name}</Link>
					</h5>
				</div>
				<div>
					<p>
						<b>
							{" "}
							<MdLocationOn />
							Location:
						</b>
						<span style={{ marginLeft: 2 }}>{residence.location}</span>
					</p>
					<p>
						<b>
							<IoMdWalk />
							Distance:{" "}
						</b>
						<span style={{ marginLeft: 2 }}>
							{residence.distance} minutes walk to campus
						</span>
					</p>
				</div>
			</div>
		</>
	);
}
