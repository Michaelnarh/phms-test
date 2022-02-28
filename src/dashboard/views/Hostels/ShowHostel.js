import React from "react";
import adombi from "../../../images/adom_bi.jpg";
import TopTitle from "../TopTitle";

export default function Showhostel(props) {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-12 ">
						<img
							className="img-fluid"
							src={adombi}
							alt="..."
							height={250}
							width={250}
						/>
					</div>
					<div className="col-md-8 col-sm-12">
						<h3 className="text-center">Adom Bi</h3>
						<div className="container">
							<h5>Description</h5>
							<p>
								display of multiple images display of multiple imagesdisplay of
								multiple imagesdisplay of multiple images display of multiple
								images display of multiple images
							</p>
						</div>
						<div className="show-flex-display">
							<div className="text-center">
								<h5>Owner's Name</h5>
								<p>John Doe</p>
							</div>
							<div className="text-center">
								<h5>Owner's Contact</h5>
								<p>0537783990</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className="text-center">
								<h5>Manager's Name</h5>
								<p>John Doe</p>
							</div>
							<div className="text-center">
								<h5>Manager's Contact</h5>
								<p>0537783990</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className=" text-center">
								<h5>Porter's Name</h5>
								<p>Suleman Smith</p>
							</div>
							<div className=" text-center">
								<h5>Manager's Contact</h5>
								<p>0537783990</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className=" text-center">
								<h5>Digital Address</h5>
								<p>AK-420-3310</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
