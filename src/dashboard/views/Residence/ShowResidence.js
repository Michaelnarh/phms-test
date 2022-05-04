import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import blankData from "../../images/blank_svg.svg";
import {
	IoIosCheckmarkCircle,
	IoIosStar,
	IoMdHome,
	IoMdMale,
	IoMdFemale,
	IoMdCalendar,
} from "react-icons/io";
import { ReviewSModal } from "./ReviewsModa";

export default function Showhostel(props) {
	let { slug } = useParams();
	const [Residence, setResidence] = useState();
	const [facilities, setFacilities] = useState([]);
	const [gimages] = useState([]);

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
			if (res.data.data.coverImage) {
				await gimages.push({
					original: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnail: `${process.env.REACT_APP_API_URL}/images/${slug}/${res.data.data.coverImage}`,
					thumbnailHeight: 40,
					thumbnailWidth: 20,
				});
			}
			setResidence(res.data.data);
			setResidence(res.data.data);
			setFacilities(res.data.facilities);
		};

		!Residence && fetchData();
	});

	return (
		<>
			<div className="container">
				{Residence && (
					<div className="row details-residence-bg">
						<div className="col-md-5 col-sm-12 ">
							{gimages.length === 0 ? (
								<img
									src={`${process.env.REACT_APP_API_URL}/images/90ef/cover-image-1646410873734.jpeg`}
									className="img-fluid"
									height={220}
									width={450}
									alt="..."
								/>
							) : (
								<ImageGallery items={gimages} />
							)}
						</div>
						<div className="col-md-7 col-sm-12">
							<h3 className="text-center">
								<b>{Residence.name}</b>
							</h3>
							<div className="container">
								<h5>Description</h5>
								<p>{Residence?.description ?? "N/A"}</p>
							</div>
							<div className="show-flex-display">
								<div className="text-center">
									<h5>Owner's Name</h5>
									<p>{Residence.ownersName ?? "N/A"}</p>
								</div>
								<div className="text-center">
									<h5>Owner's Contact</h5>
									<p>{Residence.ownersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className="text-center">
									<h5>Manager's Name</h5>

									<p>{Residence.managersName ?? "N/A"}</p>
								</div>
								<div className="text-center">
									<h5>Manager's Contact</h5>
									<p>{Residence.managersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className=" text-center">
									<h5>Porter's Name</h5>
									<p>{Residence.portersName ?? "N/A"}</p>
								</div>
								<div className=" text-center">
									<h5>Porter's Contact</h5>
									<p>{Residence.portersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className=" text-center">
									<h5>Digital Address</h5>
									<p>{Residence.digitalAddress ?? "N/A"}</p>
								</div>
								<div className=" text-center">
									<h5>Residence Type</h5>
									<p>{Residence.residenceType ?? "N/A"}</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12 ">
								<div>
									<h2>Statistics</h2>
									<div className="facility-flex">
										<div className="facility-names">
											<IoMdHome size={25} color="green" />
											<span className="ml-3">Bed Spaces Total:</span>
										</div>
										<div className="facility-count">
											<p>{Residence.totalBedspaces ?? "N/A"}</p>
										</div>
									</div>
									<div className="facility-flex">
										<div className="facility-names">
											<IoMdHome size={25} color="green" />
											<span className="ml-3">Total Number of Rooms:</span>
										</div>
										<div className="facility-count">
											<p>{Residence.roomsTotal ?? "N/A"}</p>
										</div>
									</div>
									<div className="facility-flex">
										<div className="facility-names">
											<IoMdMale size={25} color="green" />
											<span className="ml-3">Male Capacity:</span>
										</div>
										<div className="facility-count">
											<p>{Residence.maleCapacity ?? "N/A"}</p>
										</div>
									</div>
									<div className="facility-flex">
										<div className="facility-names">
											<IoMdFemale size={25} color="green" />
											<span className="ml-3">Female Capacity:</span>
										</div>
										<div className="facility-count">
											<p>{Residence.femaleCapacity ?? "N/A"}</p>
										</div>
									</div>
								</div>
								<h2>
									<b>Facilities </b>
								</h2>
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
													<span className="ml-3">{item?.facility?.name}</span>
												</div>
												<div className="facility-count">
													<p>{item?.count}</p>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className="col-md-6 col-sm-12">
								<h2>
									<b>Reviews</b>
								</h2>
								{Residence.reviews.length === 0 ? (
									<div className="text-center">
										<img src={blankData} width={300} height={350} alt="...." />
									</div>
								) : (
									Residence.reviews.slice(0, 5).map((comment, i) => (
										<div className="review-box" key={i}>
											<p className="review-comments">
												<span>
													<b>Comment:</b>{" "}
												</span>
												{comment.review}
											</p>
											<p>
												<b>Rating:</b> <span>{comment.rating}</span>{" "}
												<span>
													{" "}
													<IoIosStar size={15} color="orange" />
												</span>
											</p>
											<p>
												<b>By:</b> <span>{comment.author?.username}</span>{" "}
											</p>
											<ul>
												{" "}
												<IoMdCalendar />
												{comment.createdAt}
											</ul>
										</div>
									))
								)}
								{Residence.reviews.length > 5 && (
									<ReviewSModal
										reviews={Residence.reviews}
										name={Residence.name}
									/>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
