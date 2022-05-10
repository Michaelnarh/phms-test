import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
export default function AssemblyMembers(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [aMembers, setAMembers] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchAssemblyMembers = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/assembly-members`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setAMembers(res.data.data);
		};
		fetchAssemblyMembers();
	}, []);

	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT ASSEMBLY MEMBERS" />
				<div className="tutors-flex">
					{aMembers.map((item) => {
						return (
							<div key={item._id} className="tutors-card">
								{item.image ? (
									<img
										src={`${url}/assembly-members/${item.image}`}
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
									onClick={() =>
										navigate(`/admin/assembly-members/${item.slug}`)
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
					<Divisiontitle title="PAST ASSEMBLY MEMBERS" />
					<div className="tutors-flex">
						{aMembers
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
