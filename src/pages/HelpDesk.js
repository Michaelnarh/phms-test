import React from "react";
import helpDesk from "../images/help-desk-1.png";
import fireService from "../images/fire-service.png";
import { MdCall } from "react-icons/md";

export default function HelpDesk(props) {
	return (
		<>
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-4 col-lg-4 col-sm-12">
						<img src={helpDesk} className="img-fluid" alt="...." />
					</div>
					<div className="col-md-8 col-lg-8 col-sm-12">
						<p>
							Quick access to the information about Fire Service
							Hotlines,Chaplaincy Hotline, Counselling Hotlines, Hospital Call
							lines and Ghana Police Service
						</p>
					</div>
				</div>
				<h3 className="text-center"> INTERNAL SERVICES</h3>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">Deans of Students Office</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 80, width: 80 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">Chaplaincy Office</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid "
								style={{ height: 80, width: 80 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">Students' Affairs</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 80, width: 80 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="svg-banner">
					{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fill="#eee"
							fill-opacity="1"
							d="M0,32L1440,96L1440,320L0,320Z"
						></path>
					</svg> */}
				</div>
				<div className="contact-card">
					<div className="d-flex mb-5">
						<MdCall color="#ccc" size={50} />
						<h2>Get In Touch</h2>
					</div>

					<div className="contact-center">
						<div>
							<div className="contact-list">
								<p className="contact-list-left">Dr. James Osei Mensah</p>
								<p className="contact-list-right">0577877202 </p>
							</div>
						</div>
						<div>
							<div className="contact-list">
								<p className="contact-list-left">
									{" "}
									Hon. Christopher Nartey Mensah
								</p>
								<p className="contact-list-right">0577877202 </p>
							</div>
						</div>
						<div>
							<div className="contact-list">
								<p className="contact-list-left">Dr. James Osei Mensah</p>
								<p className="contact-list-right">0577877202 </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
