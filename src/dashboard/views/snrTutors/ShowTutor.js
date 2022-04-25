import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MapComponent from "../maps/Maps";

export default function Showtutor(props) {
	const { slug } = useParams();
	// const navigate = useNavigate();
	const [tutor, setTutor] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		const fetchTutor = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/${slug}`,
			});
			setTutor(res.data.data);
		};
		!tutor && fetchTutor();
	});

	const handleDeActivate = async (id) => {
		try {
			const res = await axios({
				method: "patch",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/de-activate/${id}`,
			});
			console.log(res.data.dat);
			setTutor(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};
	const handleActivate = async (id) => {
		try {
			const res = await axios({
				method: "patch",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/activate/${id}`,
			});
			setTutor(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="page-container mb-3">
				<div className=" mx-5 my-5">
					<div className="col-md-11 col-sm-11">
						<MapComponent />
					</div>
				</div>
				<div className="tutor-card">
					<div className="row">
						{tutor && (
							<div className="col-md-3 col-sm-12">
								{tutor.image ? (
									<img
										src={`${url}/snr-tutors/${tutor.image}`}
										className="img-fluid"
										alt="..."
										style={{ width: 150, height: 130 }}
									/>
								) : (
									<img
										src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
										className="img-fluid"
										alt="..."
										style={{ width: 150, height: 130 }}
									/>
								)}
								<div>
									<p className="tutor-name">
										{" "}
										<span className="mr-3">Name:</span>
										{tutor.name}
									</p>
									<p>
										<span className="mr-3">Contact:</span>
										{tutor.contact}
									</p>
									<p>
										<span className="mr-3">Zone:</span>
										{tutor.zone ? tutor.zone.name : "N/A"}
									</p>
								</div>
								<div>
									{/* { only visible to administrators only} */}
									{tutor?.isCurrent ? (
										<Button
											onClick={() => handleDeActivate(tutor._id)}
											variant="danger"
										>
											De-Aactivate
										</Button>
									) : (
										<Button
											onClick={() => handleActivate(tutor._id)}
											variant="warning"
										>
											Activate
										</Button>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
