import React from "react";
import adombi from "../images/adom_bi.jpg";

export default function Hosteldetails(props) {
	return (
		<>
			<div className="container-fluid mt-5 ">
				<div className="row">
					<div className="col-md-6 mb-2">
						<img
							className="img-responsive center-block"
							src={adombi}
							alt="..."
							style={{
								height: 300,
								width: 300,
								borderRadius: 5,
								margin: "auto",
							}}
						/>
						<div className="card">
							<p>display of multiple images</p>
						</div>
					</div>
					<div className="col-md-6">
						<div>
							<div>
								<h2 className="text-center">Adom Bi Hostel</h2>
								<div>
									<h5>Description</h5>
									<p>
										display of multiple images display of multiple imagesdisplay
										of multiple imagesdisplay of multiple images display of
										multiple images display of multiple images
									</p>
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h5>Location</h5>
									<p>Ayeduase</p>
								</div>
								<div className="text-center">
									<h5>Constituency / Zone</h5>
									<p>Ayeduase North</p>
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h5>Manager's Name</h5>
									<p>John Doe</p>
								</div>
								<div className="text-center">
									<h5>Manager's Contact</h5>
									<p>0537783990</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h5>Porter's Name</h5>
									<p>Suleman Smith</p>
								</div>
								<div className=" text-center">
									<h5>Manager's Contact</h5>
									<p>0537783990</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="container">
					<div className="card">mapview display</div>
				</div>
			</div>
		</>
	);
}
