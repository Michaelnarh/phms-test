import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapsComponent";
import { useParams } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import ComomentsModal from "./components/CommentsModal";
import ImageGallery from "react-image-gallery";
import axios from "axios";

export default function Hosteldetails(props) {
	const [residence, setResidence] = useState();
	const [gimages] = useState([]);
	let { slug } = useParams();
	const url = `${process.env.REACT_APP_API_URL}/images`;

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${slug}`,
			});

			await res.data.data?.images?.forEach((el) => {
				gimages.push({
					original: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
					thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
					thumbnailHeight: 40,
					thumbnailWidth: 20,
				});
			});
			if (res.data?.data?.coverImage) {
				await gimages.push({
					original: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnailHeight: 40,
					thumbnailWidth: 20,
				});
			}
			setResidence(res.data.data);
		};

		!residence && fetchData();
	});
	return (
		<>
			<div className="container mt-5 ">
				<div className="row ">
					<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
						<div className="text-center align-center">
							{gimages.length === 0 ? (
								<img
									src={`${url}/90ef/cover-image-1646409988773.jpeg`}
									alt="..."
									style={{ height: 200, width: 300 }}
								/>
							) : (
								<ImageGallery items={gimages} />
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
