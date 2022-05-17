import React from "react";
import banner from "../../images/location_search.png";
import { CustomButton, Divider } from "./stylecomponents";
import { IoMdWarning } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Banner(props) {
	return (
		<>
			<div className="row mx-5 top-margin">
				<div className="col-md-6 mt-5 mb-5">
					<h1 className="banner-header">Private Residence Management System</h1>
					<Divider />
					<h6 className="banner-sub-header">
						Access All Recognised private Hostels & Homestels
					</h6>
					<p>
						Access all registered and approved private Hostels and Homestels for
						easy room booking and information concerning your Residences.
					</p>
					<div className="row">
						<div className="col-md-6 col-sm-6">
							<Link to="/help-desk">
								<CustomButton textColor="#fff">Get Help</CustomButton>
							</Link>
						</div>
						<div className="col-sm-6 col-sm-6">
							<Link to="/hostels">
								<CustomButton textColor="#fff">Browse Hostels</CustomButton>
							</Link>
						</div>
						<div className="mt-5 warning-box">
							<div className="d-flexl">
								<IoMdWarning size={50} color="orange" />
								<span>
									<b>WARNING</b>
								</span>
							</div>
							<p className="warning-text">
								Payment for bed spaces should only be made into official{" "}
								<b>Bank Account</b> of Hostels or Homestels. Any student who
								pays cash through{" "}
								<b> Unauthorized or Unofficial Bank Account / Momo Accounts</b>{" "}
								does so at his or her own risk. Students are enncouraged to
								check available facilities of the hostels and confirm their
								interest before making payments.
							</p>
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
