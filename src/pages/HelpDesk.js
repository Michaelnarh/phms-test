import React from "react";
import helpDesk from "../images/help-desk-1.png";
import fireService from "../images/fire-service.png";
import kcc from "../images/kcc-knust.png";
import saf from "../images/stuAffairs.png";
import ghPolice from "../images/gh-police.png";
import knust from "../images/knust-logo.png";
import ecg from "../images/ecg-ghana.png";
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
						<h2 className="help-text-header">Office of the Dean of Students</h2>
						<div className="d-flex p-3">
							<img
								src={knust}
								alt="..."
								className="img-fluid"
								style={{ height: 60, width: 60 }}
							/>

							<div className="text-white mx-2">
								<p className="">
									The office of the Dean of Students was formally established in
									1997 to provide the needed necessary welfare support services
									for students during their period of study at KNUST. The
									office, over the years, has sought to fulfil its mission by
									assisting students to understand in both specific and general
									terms how the university operates both at the social and
									academic levels.
								</p>
								<p>
									This consequently enables us to understand regulations and
									procedures and ways to getting their needs met. The office had
									further provided opportunities for students to develop and
									enhance their leadership skills by involving them in decision
									making processes, supporting advocacy for students and
									providing and involving them in conflict resolution
									techniques.
								</p>
								<p>
									The office is organized into sections to help provide support
									to the student body of the university community;
								</p>
								<ul className="py-2">
									<li>
										<b>Administration</b>
									</li>
									<li>
										<b>Student Guidance and Counselling</b>
									</li>
									<li>
										<b>International Student Affairs</b>
									</li>
									<li>
										<b>Student Representative Council Affairs</b>
									</li>
									<li>
										<b>Students Housing and Residence Life</b>
									</li>
									<li>
										<b>Student Conduct and Discipline</b>
									</li>
									<li>
										<b>Student Support Services</b>
									</li>
									<li>
										<b>Financial Services</b>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="card-2 p-3 mt-3">
					<div className="row mt-3">
						<h2 className="help-text-header">Counselling Centre</h2>
						<div className="d-flex p-3 text-white">
							<img
								src={kcc}
								alt="..."
								className="img-fluid "
								style={{ height: 40, width: 70 }}
							/>
							<div>
								<p className="mx-2">
									The KNUST Counselling Center (KCC) is a mental health facility
									dedicated to the promotion of a healthy University Environment
									for students, staff and their dependents. The center has well
									trained and professional Counsellors and Clinical
									Psychologists who provide an emotionally safe, confidential,
									compassionate and respectful environment that foster
									development and greater subjective wellbeing of clients.
								</p>
								<p>
									Since its initial foundation in 1993, the KCC has evolved and
									grown to extend varied psychological and counselling services
									to communities beyond the University. We are committed to a
									cutting-edge and high-quality approach to each of our services
									toward becoming a global leader as a University mental health
									and wellbeing center.
								</p>

								<h5>Contact Information</h5>
								<ul>
									<li className="p-2">Call: 050-644-9747 / 059-4399-7772</li>
									<li className="p-1">Email: counsellingcentre@gmail.com</li>
									<li className="p-1">
										website: counsellingcentre@knust.edu.gh
									</li>
									<li className="p-2">Monday to Friday - 8:00am to 5:000pm</li>
								</ul>
							</div>
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
						<div className="d-flex p-3">
							<img
								src={saf}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 80 }}
							/>
							<div className="text-white mx-2">
								<p>
									The Student Affairs is a department under the Dean of Students
									Office to Help attend to the Financial Needs of Students
									through scholarships and also a center for International
									Exchange Programme.
									<button className="btn mx-4">
										<a
											rel="noopener noreferrer"
											style={{ color: "#fff" }}
											href={`https://www.knust.edu.gh/index.php/students/scholarships-and-grants`}
											target="_blank"
										>
											Read More
										</a>
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
				<h3 className="text-center mt-5"> EXTERNAL SERVICES</h3>
				<div className="row mt-3">
					<div className="col-md-6 ">
						<div className="card p-3 mt-3">
							<h2 className="r-name">Fire Service</h2>
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
							/>
							<p> Call Lines</p>
							<ul>
								<li>
									<b>0505001415 </b>{" "}
								</li>
								<li>
									<b>0322022221</b>
								</li>
								<li>
									<b>0322022222</b>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card p-3 mt-3">
							<h2 className="r-name">Tek Hospital</h2>
							<img
								src={fireService}
								alt="..."
								className="img-fluid"
								style={{ height: 40, width: 40 }}
							/>
							<p></p>
							<ul>
								<li>
									<b>0322060300 </b>{" "}
								</li>
								<li>
									<b>0322060320</b>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-6 ">
						<div className="card p-3 mt-3">
							<h2 className="r-name">Ghana Police Service</h2>
							<img
								src={ghPolice}
								alt="..."
								className="img-fluid"
								style={{ height: 60, width: 60 }}
							/>
							<p>Call Lines</p>
							<ul>
								<li>
									<b>191 </b>{" "}
								</li>
								<li>
									<b>18555</b>
								</li>
								<li>
									<b>0299201578</b>
								</li>
								<li>
									<b>0299202240</b>
								</li>
								<li>
									<b>0299207770</b>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card p-3 mt-3">
							<h2 className="r-name">ECG</h2>
							<img
								src={ecg}
								alt="..."
								className="img-fluid"
								style={{ height: 60, width: 60 }}
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
