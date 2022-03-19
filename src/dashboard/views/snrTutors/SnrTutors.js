import React, { useEffect, useState } from "react";
import Divisiontitle from "../DivisionTitle";
import Toptitle from "../TopTitle";
import axios from "axios";
export default function Snrtutors(props) {
	const url = `${process.env.REACT_APP_API_URL}/images`;
	const [tutors, setTutors] = useState([]);
	useEffect(() => {
		const fetchTutors = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data.total);
			setTutors(res.data.data);
		};
		fetchTutors();
	}, []);

	return (
		<>
			<div className="page-container mt-3">
				<Divisiontitle title="CURRENT SENIOR TUTORS" />
				<div className="tutors-flex">
					{tutors.map((item) => {
						return (
							<div key={item._id} className="tutors-card">
								<img
									src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
									className="img-fluid"
									alt="..."
									style={{ width: 200, height: 200 }}
								/>
								<div>
									<p className="tutor-name">{item.name}</p>
									<p>{item.contact}</p>
									<p>{item.zone.name}</p>
								</div>

								<button className="btn form-control"> View</button>
							</div>
						);
					})}
				</div>
				<hr />
				<div>
					<Divisiontitle title="PAST SENIOR TUTORS" />
					<div className="tutors-flex">
						{tutors
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
											<p>{item.zone.name}</p>
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
