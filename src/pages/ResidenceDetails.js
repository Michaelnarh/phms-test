import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapsComponent";
import { useParams } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import ComomentsModal from "./components/CommentsModal";
import ImageGallery from "react-image-gallery";
import axios from "axios";

export default function Hosteldetails(props) {
	const [residence, setResidence] = useState();
	let { id } = useParams();
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
	];

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${id}`,
			});
			console.log(res);
			setResidence(res.data.data);
		};
		fetchData();
	}, []);
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
								{/* {residence.bookingLink && (
									<CustomButton className="my-3">
										<a href={residence.bookingLink}>Book a Room</a>
									</CustomButton>
								)} */}
							</div>
						</div>
					</div>
					<div className="col-md-8 col-lg-6 col-sm-12">
						<div>
							<div>
								<h2 className="text-center details-header ">
									{residence.name}
								</h2>
								s
								<div>
									<h6>Description</h6>
									{/* <p>{residence.desc ?? "N/A"}</p> */}
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Location</h6>
									{/* <p>{residence.location ?? "N/A"}</p> */}
								</div>
								<div className="text-center">
									<h6>Constituency / Zone</h6>
									{/* <p>{residence.zone.name}</p> */}
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Manager's Name</h6>
									<p>{residence.managersName ?? "N/A"}</p>
								</div>
								<div className="text-center">
									<h6>Manager's Contact</h6>
									<p>{residence.managersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Porter's Name</h6>
									{/* <p>{residence.portersName ?? "N/A"}</p> */}
								</div>
								<div className=" text-center">
									<h6>Porter's Contact</h6>
									{/* <p>{residence.portersContact ?? "N/A"}</p> */}
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Digital Address</h6>
									{/* <p>{residence.digitalAddress ?? "N/A"}</p> */}
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
