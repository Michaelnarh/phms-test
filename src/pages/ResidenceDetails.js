import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsModal from "./components/CommentsModal";
import ImageGallery from "react-image-gallery";
import { IoIosCheckmarkCircle } from "react-icons/io";
import AuthStore from "./../store/AuthStore";
import Iframe from "./components/utils/Iframe";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { CustomButton } from "./components/stylecomponents";
import AxiosInstance from "./components/utils/AxiosBase";
import CommentsAndLogInModal from "./components/CommentsAndLoginModal";
// import LogInModal from "./components/auth/Login";
// import MapComponent from "./components/MapsComponent";

export default function Hosteldetails(props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [residence, setResidence] = useState();
	const auth = new AuthStore();
	const [facilities, setFacilities] = useState([]);
	const [gimages] = useState([]);
	let { slug } = useParams();
	const url = `${process.env.REACT_APP_API_URL}/images`;

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			setIsLoading(true);
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/residences/${slug}`,
			});

			if (res.data?.data?.coverImage) {
				await gimages.push({
					original: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnailHeight: 40,
					thumbnailWidth: 20,
				});
			}
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
			setResidence(res.data.data);
			setFacilities(res.data.facilities);
		};

		const timer = setTimeout(() => {
			fetchData();

			setIsLoading(false);
		}, 4000);

		return () => clearTimeout(timer);
	}, [setIsLoading, slug, gimages]);
	return (
		<>
			<div className="top-svg-detail-page">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#0a6e23"
						fillOpacity="1"
						d="M0,288L1440,128L1440,0L0,0Z"
					></path>
				</svg>
				{isLoading ? (
					<div id="loading" />
				) : (
					<>
						<h2 className="text-center details-header">
							{residence && (residence.name ?? "N/A")}
						</h2>

						<div className="container mt-5 detail-component">
							<ToastContainer style={{ marginTop: 90 }} />
							<div className="row ">
								<div className="col-md-4 col-lg-6 col-sm-12 mb-2">
									{residence && (
										<>
											<div className="text-center align-center">
												{gimages.length === 0 ? (
													<div style={{ marginRight: "auto" }}>
														<img
															src={`${url}/90ef/cover-image-1646409988773.jpeg`}
															alt="..."
															className="img-fluid"
															style={{ height: 300 }}
														/>
													</div>
												) : (
													<ImageGallery items={gimages} />
												)}
											</div>
											<div className="row">
												<div className="col-md-6 col-lg-6 col-sm-12">
													{auth.getToken() ? (
														<CommentsModal
															token={auth.getToken()}
															id={residence?._id}
														/>
													) : (
														<CommentsAndLogInModal />
													)}
												</div>

												<div className="col-md-6 col-lg-6 col-sm-12">
													{residence?.bookingLink && (
														<CustomButton className="my-3">
															<a
																rel="noopener noreferrer"
																style={{ color: "#fff" }}
																href={`http://${residence?.bookingLink}`}
																target="_blank"
															>
																Book Now
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
											<div>
												<h6>Description</h6>
												<p>{residence && (residence.description ?? "N/A")}</p>
											</div>
										</div>
										<div className="flex-display">
											<div className="text-center">
												<h6>Location</h6>
												<p>
													{" "}
													{residence &&
														(residence.location
															? residence.location?.name
															: "N/A")}
												</p>
											</div>
											<div className="text-center">
												<h6>Constituency/Zone</h6>
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
												<p>
													{residence && (residence.managersContact ?? "N/A")}
												</p>
											</div>
										</div>
										<div className="flex-display">
											<div className=" text-center">
												<h6>Porter's Name</h6>
												<p>{residence && (residence.portersName ?? "N/A")}</p>
											</div>
											<div className=" text-center">
												<h6>Porter's Contact</h6>
												<p>
													{residence && (residence.portersContact ?? "N/A")}
												</p>
											</div>
										</div>
										<div className="flex-display">
											<div className=" text-center">
												<h6>Digital Address</h6>
												<p>
													{residence && (residence.digitalAddress ?? "N/A")}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="container">
								<div className="row">
									<div className="col-md-6">
										<h4>
											<b>Facilities</b>
										</h4>
										{facilities.length === 0 ? (
											<>
												<p>Not Available</p>
											</>
										) : (
											facilities.map((item) => {
												return (
													<div key={item._id} className="facility-flex">
														<div className="facility-names">
															<IoIosCheckmarkCircle size={30} color="green" />
															<span className="ml-3">
																{item?.facility?.name}
															</span>
														</div>
														<div className="facility-count">
															<p>{item?.count}</p>
														</div>
													</div>
												);
											})
										)}
										<Button className="mt-4" onClick={() => navigate(-1)}>
											Go Back
										</Button>
									</div>
									<div className="col-md-3">
										{/* <MapComponent isMarkerShown={true} /> */}
										{residence?.bookingLink && (
											<button className=" btn p-3 my-3">
												<a
													rel="noopener noreferrer"
													style={{ color: "#fff" }}
													href={`http://${residence?.mapLink}`}
													target="_blank"
												>
													Direction Link
												</a>
											</button>
										)}

										<div>
											{residence?.gpsAddress?.coordinates[0] !== 0 ? (
												<Iframe
													name={residence?.name}
													lat={residence?.gpsAddress?.coordinates[1]}
													lng={residence?.gpsAddress?.coordinates[0]}
												/>
											) : (
												<h5>Map View Not Available yet</h5>
											)}
											{/* <iframe
										width={600}
										height={300}
										src={`https://www.google.com/maps/place/Amen+Main+Hostel/@6.6717611,-1.5620566,17z/data=!3m1!4b1!4m5!3m4!1s0xfdb947d543e1dcd:0xe15e8d5cf504de5!8m2!3d6.6716668!4d-1.5599803=&output=embed`}
										title="my-location"
										style={{"visibility:visible"}}
									/> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
