import React from "react";
import helpDesk from "../images/help-desk-1.png";
import fireService from "../images/fire-service.png";

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
				<div className="card mt-3">
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
				<div className="card mt-3">
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
				<div className="card mt-3">
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
		</>
	);
}
