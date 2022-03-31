import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapsComponent";
import { useParams, Link } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import ComomentsModal from "./components/CommentsModal";
import ImageGallery from "react-image-gallery";
import axios from "axios";

export default function Hosteldetails(props) {
	const [residence, setResidence] = useState();
	const [gimages] = useState([]);
	let { slug } = useParams();
	const url = `${process.env.REACT_APP_API_URL}/images`;
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
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${slug}`,
			});
			console.log(res);
			setResidence(res.data.data);
			res.data.data.images.forEach((el) => {
				gimages.push({
					original: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
					thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
				});
			});
			gimages.push({
				original: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
				thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
			});
		};

		!residence && fetchData();
	});
	return (
		<>
			<div className="container mt-5 ">
				<div className="row">
					<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
						<div>
							{gimages.length === 0 ? (
								<ImageGallery items={gimages} />
							) : (
								<img
									src={`${url}/90ef/cover-image-1646409988773.jpeg`}
									alt="..."
									style={{ height: 200, width: 300 }}
								/>
							)}
						</div>
						<div className="row">
							<div className="col-md-6 col-lg-6 col-sm-12">
								<ComomentsModal />
							</div>
							<div className="col-md-6 col-lg-6 col-sm-12">
								{residence && (
									// <CustomButton
									<a
										rel="noopener noreferrer"
										href={`http://${residence.bookingLink}`}
										target="_blank"
									>
										Link Here
									</a>
									// </CustomButton>
								)}
							</div>
						</div>
					</div>
					<div className="col-md-8 col-lg-6 col-sm-12">
						<div>
							<div>
								<h2 className="text-center details-header ">
									{residence && (residence.name ?? "N/A")}
								</h2>

								<div>
									<h6>Description</h6>
									{/* <p>{residence && (residence.description ?? "N/A")}</p> */}
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Location</h6>
									<p>
										{" "}
										{residence &&
											(residence.location ? residence.location.name : "N/A")}
									</p>
								</div>
								<div className="text-center">
									<h6>Constituency / Zone</h6>
									<p>
										{residence &&
											(residence.location
												? residence.location.zone.name
												: "N/A")}
									</p>
								</div>
							</div>
							<div className="flex-display">
								<div className="text-center">
									<h6>Manager's Name</h6>
									<p>{residence && (residence.managersName ?? "N/A")}</p>
								</div>
								<div className="text-center">
									<h6>Manager's Contact</h6>
									<p>{residence && (residence.managersContact ?? "N/A")}</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Porter's Name</h6>
									<p>{residence && (residence.portersName ?? "N/A")}</p>
								</div>
								<div className=" text-center">
									<h6>Porter's Contact</h6>
									<p>{residence && (residence.portersContact ?? "N/A")}</p>
								</div>
							</div>
							<div className="flex-display">
								<div className=" text-center">
									<h6>Digital Address</h6>
									<p>{residence && (residence.digitalAddress ?? "N/A")}</p>
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
