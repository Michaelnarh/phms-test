import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapsComponent";
import { useParams } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import ComomentsModal from "./components/CommentsModal";
import ImageGallery from "react-image-gallery";

export default function Hosteldetails(props) {
	const { id } = useParams();
	const [Residence, setResidence] = useState({});
	useEffect(() => {
		// axios get data
		//axios.get(`https://hostels/${id}`);
		// cleanup
		// return () => {};
	}, []);
	const images = [
		{
			id: 1,
			original: "/imgs/adom_bi-2.jpg",
			thumbnail: "https:/picsum.photos/id/1015/250/150",
			orginalHeight: 600,
			orginalWidth: 700,
			thumbnailHeight: 40,
			thumbnailWidth: 20,
		},
		{
			id: 2,
			original: "/imgs/adom_bi.jpg",
			thumbnail: "https:/picsum.photos/id/1011/250/150",
		},
		{
			id: 3,
			original: "/imgs/canam-hall-2.jpg",
			thumbnail: "https:/picsum.photos/id/1011/250/150",
		},
		{
			id: 4,
			original: "/imgs/jj.jpg",
			thumbnail: "https:/picsum.photos/id/1011/250/150",
			orginalHeight: 100,
			orginalWidth: 400,
			thumbnailHeight: 40,
			thumbnailWidth: 20,
		},
	];
	return (
		<>
			<div className="container mt-5 ">
				<div className="row">
					<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
						<div>
							<ImageGallery items={images} />
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
									<h6>Description</h6>
									<p>
										display of multiple images display of multiple imagesdisplay
										of multiple imagesdisplay of multiple images display of
										multiple images display of multiple images
									</p>
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Location</h6>
									<p>Ayeduase</p>
								</div>
								<div className="text-center">
									<h6>Constituency / Zone</h6>
									<p>Ayeduase North</p>
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Manager's Name</h6>
									<p>John Doe</p>
								</div>
								<div className="text-center">
									<h6>Manager's Contact</h6>
									<p>0537783990</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Porter's Name</h6>
									<p>Suleman Smith</p>
								</div>
								<div className=" text-center">
									<h6>Manager's Contact</h6>
									<p>0537783990</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Digital Address</h6>
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
						{/* <MapComponent isMarkerShown={true} /> */}
					</div>
				</div>
			</div>
		</>
	);
}
