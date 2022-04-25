import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapsComponent";
import { useParams } from "react-router-dom";
import { CustomButton } from "./components/stylecomponents";
import CommentsModal from "./components/CommentsModal";
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
				if (el) {
					gimages.push({
						original: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
						thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${el}`,
						thumbnailHeight: 40,
						thumbnailWidth: 20,
					});
				}
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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#0a6e23"
					fill-opacity="1"
					d="M0,288L1440,128L1440,0L0,0Z"
				></path>
			</svg>
			{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
						fill="#0a6e23"
					fill-opacity="1"
					d="M0,160L48,181.3C96,203,192,245,288,256C384,267,480,245,576,229.3C672,213,768,203,864,181.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
				></path>
			</svg> */}
			<div className="container mt-5 ">
				<div className="row ">
					<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
						{residence && (
							<>
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
										<CommentsModal id={residence?._id} />
									</div>
									<div className="col-md-6 col-lg-6 col-sm-12">
										{residence && (
											<CustomButton>
												<a
													rel="noopener noreferrer"
													href={`http://${residence?.bookingLink}`}
													target="_blank"
												>
													Link Here
												</a>
											</CustomButton>
										)}
									</div>
								</div>
							</>
						)}
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
											(residence.location ? residence.location?.name : "N/A")}
									</p>
								</div>
								<div className="text-center">
									<h6>Constituency / Zone</h6>
									<p>
										{residence &&
											(residence.location
												? residence?.location?.zone?.name
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
