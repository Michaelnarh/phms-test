import React from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdWalk } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Hostel(props) {
	const { data } = props;
	return (
		<>
			<div className="residence">
				<div>
					<Link to={`${data.name}`}>
						<img
							src={data.img}
							alt="..."
							style={{ height: "200px", width: "300px" }}
						/>
					</Link>
					<h5 className="text-center r-name">
						<Link to={`${data.name}`}>{data.name}</Link>
					</h5>
				</div>
				<div>
					<p>
						<b>
							{" "}
							<MdLocationOn />
							Location:
						</b>
						<span style={{ marginLeft: 2 }}>{data.location}</span>
					</p>
					<p>
						<b>
							<IoMdWalk />
							Distance:{" "}
						</b>
						<span style={{ marginLeft: 2 }}>
							{data.distance} minutes walk to campus
						</span>
					</p>
				</div>
			</div>
		</>
	);
}
