import React, { useState, useEffect } from "react";
import adombi from "../images/adom_bi.jpg";
import adombi2 from "../images/adom_bi-2.jpg";
import MapComponent from "./components/MapsComponent";
import SlideShow from "./components/SlideShow";
import { useParams } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import ComomentsModal from "./components/CommentsModal";

export default function Hosteldetails(props) {
	const { id } = useParams();
	const [Residence, setResidence] = useState({});
	useEffect(() => {
		// axios get data
		//axios.get(`https://hostels/${id}`);
		// cleanup
		// return () => {};
	}, []);
	return (
		<>
			<div className="container mt-5 ">
				<div className="row">
					<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
						<div>
							<img
								className="img-fluid"
								src={adombi}
								alt="..."
								style={{
									borderRadius: 5,
								}}
							/>
						</div>
						<div className="mt-2 flex-display-s">
							<div>
								<img
									src={adombi}
									style={{ height: 100, width: 100 }}
									alt="..."
								/>
							</div>
							<div>
								<img
									src={adombi2}
									style={{ height: 100, width: 100 }}
									alt="..."
								/>
							</div>
							<div>
								<img
									src={adombi}
									style={{ height: 100, width: 100 }}
									alt="..."
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-lg-6 col-sm-12">
								<ComomentsModal />
							</div>
							<div className="col-md-6 col-lg-6 col-sm-12">
								<CustomButton className="my-3">Book a Room</CustomButton>
							</div>
						</div>
					</div>
					<div className="col-md-8 col-lg-6 col-sm-12">
						<div>
							<div>
								<h2 className="text-center details-header ">{id}</h2>
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
							<div className="flex-display">
								<div className=" text-center">
									<h5>Digital Address</h5>
									<p>AK-420-3310</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="container">
					<div className="card">
						<MapComponent isMarkerShown={true} />
					</div>
				</div>
			</div>
		</>
	);
}
