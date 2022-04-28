import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Snrtutors(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [tutors, setTutors] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchTutors = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setTutors(res.data.data);
		};
		fetchTutors();
	}, []);

	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT SENIOR TUTORS" />
				<div className="tutors-flex">
					{tutors?.length > 0 &&
						tutors
							.filter((person) => person.isCurrent)
							.map((item) => {
								return (
									<div key={item._id} className="tutors-card">
										{item.image ? (
											<img
												src={`${url}/snr-tutors/${item.image}`}
												className="img-fluid"
												alt={item.name}
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
											<p>{item.zone ? item.zone?.name : "N/A"}</p>
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
						{tutors?.length > 0 &&
							tutors
								.filter((person) => !person.isCurrent)
								.map((item) => {
									return (
										<div key={item._id} className="tutors-card">
											{item.image ? (
												<img
													src={`${url}/snr-tutors/${item.image}`}
													className="img-fluid"
													alt={item.name}
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
												onClick={() =>
													navigate(`/admin/snr-tutors/${item.slug}`)
												}
												className="btn form-control"
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
