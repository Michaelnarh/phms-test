import React from "react";
import banner from "../../images/location_search.png";
import { CustomButton, Divider } from "./stylecomponents";
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
						Access all registered private hostels Access all registered private
						hostelsAccess all registered private hostels
					</p>
					<div className="row">
						<div className="col-sm-6 col-md-6">
							<CustomButton textColor="#fff">Get Help</CustomButton>
						</div>
						<div className="col-sm-6 col-md-6">
							<CustomButton textColor="#fff">Browse Hostels</CustomButton>
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
