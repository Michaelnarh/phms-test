import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AreaMPs(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [areaMps, setAreaMps] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchAreaMps = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/area-mps`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data.total);
			setAreaMps(res.data.data);
		};
		if (areaMps.length === 0) {
			fetchAreaMps();
		}
	});
	console.log(areaMps);
	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT AREA MPS" />
				<div className="tutors-flex">
					{areaMps?.length > 0 &&
						areaMps.map((item) => {
							return (
								<div key={item._id} className="tutors-card">
									{item.image ? (
										<img
											src={`${url}/area-mps/${item.image}`}
											className="img-fluid"
											alt="..."
											style={{ width: 300, height: 250 }}
										/>
									) : (
										<img
											src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
											className="img-fluid"
											alt="..."
											style={{ width: 300, height: 250 }}
										/>
									)}

									<div>
										<p className="tutor-name">{item.name}</p>
										<p>{item.contact}</p>
										<p>{item.zone ? item.zone.name : "N/A"}</p>
										<p>{item.tutor ? item.tutor.name : "N/A"}</p>
									</div>

									<button
										onClick={() => navigate(`/admin/area-mps/${item.slug}`)}
										className="btn form-control"
									>
										{" "}
										View
									</button>
								</div>
							);
						})}
				</div>
				<hr />
				<div>
					<Divisiontitle title="PAST AREA MPS" />
					<div className="tutors-flex">
						{areaMps?.length > 0 &&
							areaMps
								.filter((person) => !person.isCurrent)
								.map((item) => {
									return (
										<div key={item._id} className="tutors-card">
											<img
												src={`${url}/snrtutors/gh.jpg`}
												className="img-fluid"
												alt="..."
												style={{ width: 350, height: 250 }}
											/>
											<div>
												<p className="tutor-name">{item.name}</p>
												<p>{item.zone ? item.zone.name : "N/A"}</p>
												<p>{item.tutor ? item.tutor.name : "N/A"}</p>
											</div>

											<button
												className="btn form-control"
												onClick={() => navigate(`/admin/area-mps/${item.slug}`)}
											>
												{" "}
												View
											</button>
										</div>
									);
								})}
					</div>
				</div>
			</div>
		</>
	);
}
