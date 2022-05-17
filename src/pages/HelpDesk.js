import React from "react";
import helpDesk from "../images/help-desk-1.png";
import fireService from "../images/fire-service.png";
import kcc from "../images/kcc-knust.png";
import saf from "../images/stuAffairs.png";
import scc from "../images/scc.png";
import { MdCall } from "react-icons/md";

export default function HelpDesk(props) {
	return (
		<>
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-4 col-lg-4 col-sm-12 mb-5">
						<img src={helpDesk} width={150} className="img-fluid" alt="...." />
					</div>
					<div className="col-md-8 col-lg-8 col-sm-12 ">
						<h3 className="help-desk-caption">Quick access to information</h3>
						<p className="text-mutted">
							Do have any challenge related to your Hostel / Homestel that
							demand the following help lines? Donot hesitate, reach out to them
							and they are willing to help in the shortest time possible. Fire
							Service Hotlines, Chaplaincy Hotline, Counselling Hotlines,
							Hospital Call lines and the Ghana Police Service
						</p>
					</div>
				</div>
				<h3 className="text-center"> INTERNAL SERVICES</h3>
				<div className="card-1 p-3 mt-3">
					<div className="row mt-3">
						<h2 className="help-text-header">Deans of Students Office</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card-2 p-3 mt-3">
					<div className="row mt-3">
						<h2 className="help-text-header">Counselling Centre</h2>
						<div className="col-md-3 p-3">
							<img
								src={kcc}
								alt="..."
								className="img-fluid "
								style={{ height: 40, width: 70 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card-3 p-3 mt-3">
					<div className="row mt-3">
						<h2 className="help-text-header">Chaplaincy Office</h2>
						<div className=" p-3">
							<div className="d-flex">
								<img
									src={scc}
									alt="..."
									className="img-fluid ml-2"
									style={{ height: 40, width: 60 }}
								/>
								<p className="pl-3">
									Culpa dolorum, cupidatat dicta vivamus convallis montes
									dignissim irure ut omnis quibusdam. Ab, pulvinar itaque,
									phasellus, magni facilisi! Felis et, quo quisque, egestas
									repellendus? Harum ex sint phasellus, magni facilisi! Felis
									et, quo quisque, egestas repellendus? Harum ex sint phasellus,
									magni facilisi! Felis et, quo quisque, egestas repellendus?
									Harum ex sint
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="card-4 p-3 mt-3">
					<div className="row mt-3">
						<h2 className="help-text-header">Student Affairs</h2>
						<div className="col-md-3 p-3">
							<img
								src={saf}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 80 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<h3 className="text-center mt-5"> EXTERNAL SERVICES</h3>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">Fire Service</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
							/>
							<p></p>
						</div>
					</div>
					<div className="row mt-3">
						<h2 className="r-name">Tek Hospital</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">Ghana Police Service</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid "
								style={{ height: 40, width: 40 }}
							/>
							<p></p>
						</div>
					</div>
				</div>
				<div className="card p-3 mt-3">
					<div className="row mt-3">
						<h2 className="r-name">ECG</h2>
						<div className="col-md-3 p-3">
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
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
						<h2 className="get-in-touch">Get In Touch</h2>
					</div>

					<div className="contact-center">
						<div>
							<div className="contact-list">
								<p className="contact-list-left">Dr. James Osei Mensah</p>
								<p className="contact-list-right">0577877202 / 0577877202 </p>
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
