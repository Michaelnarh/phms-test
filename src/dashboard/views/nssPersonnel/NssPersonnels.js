import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NssPersonnels(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [personnels, setPersonnels] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchTutors = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/nss-personnels`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data.total);
			setPersonnels(res.data.data);
		};
		fetchTutors();
	}, []);
	console.log(personnels);
	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT SERVICE PERSONNELS" />
				<div className="tutors-flex">
					{personnels?.length > 0 &&
						personnels
							.filter((person) => person.isCurrent)
							.map((item) => {
								return (
									<div key={item._id} className="tutors-card">
										{item.image ? (
											<img
												src={`${url}/nss-personnels/${item.image}`}
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
											<p>{item.tutor ? item.tutor.name : "N/A"}</p>
										</div>

										<button
											onClick={() =>
												navigate(`/admin/nss-personnels/${item.slug}`)
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
				<hr />
				<div>
					<Divisiontitle title="PAST SERVICE PERSONNELS" />
					<div className="tutors-flex">
						{personnels?.length > 0 &&
							personnels
								.filter((person) => !person.isCurrent)
								.map((item) => {
									return (
										<div key={item._id} className="tutors-card">
											{item.image ? (
												<img
													src={`${url}/nss-personnels/${item.image}`}
													className="img-fluid"
													alt="..."
													style={{ width: 250, height: 230 }}
												/>
											) : (
												<img
													src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
													className="img-fluid"
													alt="..."
													style={{ width: 250, height: 230 }}
												/>
											)}

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
