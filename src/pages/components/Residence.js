import React from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdWalk } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Residence(props) {
	const navigate = useNavigate();

	const { residence } = props;
	const url = `${process.env.REACT_APP_API_URL}/images`;

	const handleDetials = async (id) => {
		navigate(`${id}`);
	};

	return (
		<>
			<div className="residence">
				<div>
					<aside
						onClick={() => {
							handleDetials(residence._id);
						}}
						// to={`${residence._id}`}
					>
						{residence.coverImage ? (
							<img
								src={`${url}/${residence._id.slice(20, 24)}/${
									residence.coverImage
								}`}
								alt="..."
								style={{ height: "200px", width: "300px" }}
							/>
						) : (
							<img
								src={`${url}/90ef/cover-image-1646409988773.jpeg`}
								alt="..."
								style={{ height: 200, width: 300 }}
							/>
						)}
					</aside>
					<h5 className="text-center r-name">
						<Link to={`${residence._id}`}>{residence.name}</Link>
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
