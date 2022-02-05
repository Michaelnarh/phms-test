import React from "react";
import banner from "../../images/location_search.png";
import { CustomButton, Divider } from "./stylecomponents";
import { Link } from "react-router-dom";
export default function Banner(props) {
	return (
		<>
			<div className="row mx-5">
				<div className="col-md-6 mt-5">
					<h1 className="banner-header">Private Residence Management System</h1>
					<Divider />
					<h6 className="banner-sub-header">
						Access All Registered private Hostels & Homestels
					</h6>
					<p>
						Access all registered and approved private Hostels and Homestels for
						easy room booking and information concerning your Residences.
					</p>
					<div className="row">
						<div className="col-sm-6 col-md-6">
							<Link to="/help-desk">
								<CustomButton textColor="#fff">Get Help</CustomButton>
							</Link>
						</div>
						<div className="col-sm-6 col-md-6">
							<Link to="/hostels">
								<CustomButton textColor="#fff">Browse Hostels</CustomButton>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-6 mt-3">
					<img src={banner} alt="..." className="img-fluid" />
				</div>
			</div>
		</>
	);
}
