import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NationalMps(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [nmps, setNmps] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchNationalMps = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setNmps(res.data.data);
		};
		fetchNationalMps();
	}, []);

	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT SENIOR TUTORS" />
				<div className="tutors-flex">
					{nmps.map((item) => {
						return (
							<div key={item._id} className="tutors-card">
								{item.image ? (
									<img
										src={`${url}/snr-tutors/${item.image}`}
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
								</div>

								<button
									onClick={() => navigate(`/admin/snr-tutors/${item.slug}`)}
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
					<Divisiontitle title="PAST SENIOR TUTORS" />
					<div className="tutors-flex">
						{nmps
							.filter((person) => !person.isCurrent)
							.map((item) => {
								return (
									<div key={item._id} className="tutors-card">
										<img
											src={`${url}/snrtutors/gh.jpg`}
											className="img-fluid"
											alt="..."
											style={{ width: 200, height: 200 }}
										/>
										<div>
											<p className="tutor-name">{item.name}</p>
											<p>{item.contact}</p>
											<p>{item.zone ? item.zone.name : "N/A"}</p>
										</div>

										<button className="btn form-control"> View</button>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
}
