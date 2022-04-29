import React from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdWalk } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
export default function Residence(props) {
	const navigate = useNavigate();

	const { residence } = props;
	const url = `${process.env.REACT_APP_API_URL}/images`;

	const handleDetials = async (slug) => {
		navigate(`${slug}`);
	};

	return (
		<>
			<div className="residence">
				<div>
					<aside
						onClick={() => {
							handleDetials(residence.slug);
						}}
					>
						{residence.coverImage ? (
							<img
								src={`${url}/${residence.slug}/${residence.coverImage}`}
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
						<Link to={`${residence.slug}`}>{residence.name}</Link>
					</h5>
				</div>
				<div>
					<p>
						<b>
							{" "}
							<MdLocationOn />
							Location:
						</b>
						<span style={{ marginLeft: 5 }}>
							{residence.location ? residence.location.name : "N/A"}
						</span>
					</p>
					<p>
						<b>
							<IoMdWalk />
							Distance:{" "}
						</b>
						<span style={{ marginLeft: 5 }}>
							{residence.distance
								? `${residence.distance} minutes walk to campus`
								: "N/A"}
						</span>
					</p>
				</div>
			</div>
		</>
	);
}
