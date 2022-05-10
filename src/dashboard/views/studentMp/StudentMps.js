import React, { useState, useEffect } from "react";
import Divisiontitle from "../DivisionTitle";
import AxiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import CustomSpinner from "../../utils/CustomSpinner";
import { ToastContainer, toast } from "react-toastify";
export default function StudentMPs(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [isLoading, setIsLoading] = useState(false);
	const [studentMps, setStudentMps] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		console.log("hey");
		setIsLoading(true);
		const fetchAreaMps = async () => {
			try {
				const res = await AxiosInstance({
					method: "get",
					url: `/api/v1/student-mps`,
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(res.data.data);
				setStudentMps(res.data.data);
				setIsLoading(false);
			} catch (err) {
				if (err?.response?.data?.message) {
					toast.error(err.response.data.message, { position: "top-center" });
				}
			}
		};

		fetchAreaMps();

		const timer = setTimeout(() => fetchAreaMps, 2000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT STUDENT MPS" />
				{isLoading ? (
					<CustomSpinner type="circle" />
				) : (
					<>
						<div className="tutors-flex">
							{studentMps
								.filter((person) => person.isCurrent)
								.map((item) => {
									return (
										<div key={item._id} className="tutors-card">
											{item.image ? (
												<img
													src={`${url}/student-mps/${item.image}`}
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
												onClick={() =>
													navigate(`/admin/student-mps/${item.slug}`)
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
							<Divisiontitle title="PAST STUDENT MPS" />
							<table>
								<thead>
									<tr>
										<th>ID</th>
										<th>Image</th>
										<th>Name</th>
										<th>Contact</th>
										<th>Zone</th>
										<th>Senior Tutor</th>
										<th className="text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									{studentMps?.length > 0 &&
										studentMps
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
					</>
				)}
			</div>
		</>
	);
}
