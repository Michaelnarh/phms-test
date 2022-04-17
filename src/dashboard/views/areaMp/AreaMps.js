import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
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
						areaMps
							.filter((person) => person.isCurrent)
							.map((item) => {
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
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Image</th>
								<th>Name</th>
								<th>Contact</th>
								<th>Zone</th>
								<th>Senior Tutor</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{areaMps?.length > 0 &&
								areaMps
									.filter((person) => !person.isCurrent)
									.map((item) => {
										return (
											<tr>
												<td>{item._id.slice(20, 24)}</td>
												<td>
													{item.image ? (
														<img
															src={`${url}/area-mps/${item.image}`}
															className="img-fluid"
															alt="..."
															style={{ width: 50, height: 50 }}
														/>
													) : (
														<img
															src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
															className="img-fluid"
															alt="..."
															style={{ width: 50, height: 50 }}
														/>
													)}
												</td>
												<td> {item.name}</td>
												<td> {item.contact}</td>
												<td>{item.zone ? item.zone.name : "N/A"}</td>
												<td>{item.tutor ? item.tutor.name : "N/A"}</td>
												<td className="table-inline-flex">
													<FaEye
														size={20}
														onClick={() =>
															navigate(`/admin/area-mps/${item.slug}`)
														}
														color="var(--darkBlue)"
														title="View"
													/>
													<FaPen
														size={20}
														onClick={() =>
															navigate(`/admin/area-mps/${item.slug}`)
														}
														color="var(--mainOrange)"
														title="Edit"
													/>
													<FaMinusCircle
														onClick={() => console.log("delete")}
														size={20}
														color="var(--mainRed)"
														title="Delete"
													/>
												</td>
											</tr>
										);
									})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
