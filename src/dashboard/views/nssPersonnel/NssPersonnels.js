import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
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
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Image</th>
								<th>Name</th>
								<th>Contact</th>
								<th>Senior Tutor</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{personnels?.length > 0 &&
								personnels
									.filter((person) => !person.isCurrent)
									.map((item) => {
										return (
											<tr>
												<td>{item._id.slice(20, 24)}</td>
												<td>
													{item.image ? (
														<img
															src={`${url}/nss-personnels/${item.image}`}
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
												<td>{item.tutor ? item.tutor.name : "N/A"}</td>
												<td className="table-inline-flex">
													<FaEye
														size={20}
														onClick={() =>
															navigate(`/admin/nss-personnels/${item.slug}`)
														}
														color="var(--darkBlue)"
														title="View"
													/>
													<FaPen
														size={20}
														onClick={() =>
															navigate(`/admin/nss-personnels/${item.slug}`)
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
