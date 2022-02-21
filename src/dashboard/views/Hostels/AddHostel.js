import React from "react";

export default function Addhostel(props) {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-12">
						<input
							type="text"
							className="form-control"
							placeholder=" Residence Name"
							aria-label="name"
						/>
					</div>
					<div className="col-md-4 col-sm-12 ">
						<select class="form-select" aria-label="Default select example">
							<option value="1">HOSTEL</option>
							<option value="2">HOMESTEL</option>
							<option value="3">Other</option>
						</select>
					</div>
					<div className="col-md-4 col-sm-12">
						<input
							type="text"
							className="form-control"
							placeholder="Location"
							aria-label="location"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 col-sm-12">
						<input
							type="text"
							className="form-control"
							placeholder="Digital Address"
							aria-label="gpsAddress"
						/>
					</div>
					<div className="col-md-4 col-sm-12 ">
						<input
							type="file"
							className="form-control"
							placeholder="Digital Address"
							aria-label="digitalAddress"
						/>
					</div>
					<div className="col-md-4 col-sm-12">
						<input
							type="text"
							className="form-control"
							placeholder="Location"
							aria-label="location"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
