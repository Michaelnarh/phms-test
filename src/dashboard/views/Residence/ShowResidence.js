import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";

export default function Showhostel(props) {
	let { slug } = useParams();
	const [hostel, setHostel] = useState();
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
			setHostel(res.data.data);
			setHostel(res.data.data);
		};

		!hostel && fetchData();
	}, []);

	return (
		<>
			<div className="container">
				{hostel && (
					<div className="row details-residence-bg">
						<div className="col-md-5 col-sm-12 ">
							{gimages.length === 0 ? (
								<img
									src={`${process.env.REACT_APP_API_URL}/images/90ed/cover-image-1646411339799.jpeg`}
									height={250}
									width={350}
									alt="..."
								/>
							) : (
								<ImageGallery items={gimages} />
							)}
							{/* show images gallery */}
						</div>
						<div className="col-md-7 col-sm-12">
							<h3 className="text-center">{hostel.name}</h3>
							<div className="container">
								<h5>Description</h5>
								<p>
									display of multiple images display of multiple imagesdisplay
									of multiple imagesdisplay of multiple images display of
									multiple images display of multiple images
								</p>
							</div>
							<div className="show-flex-display">
								<div className="text-center">
									<h5>Owner's Name</h5>
									<p>{hostel.ownersName ?? "N/A"}</p>
								</div>
								<div className="text-center">
									<h5>Owner's Contact</h5>
									<p>{hostel.ownersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className="text-center">
									<h5>Manager's Name</h5>

									<p>{hostel.managersName ?? "N/A"}</p>
								</div>
								<div className="text-center">
									<h5>Manager's Contact</h5>
									<p>{hostel.managersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className=" text-center">
									<h5>Porter's Name</h5>
									<p>{hostel.portersName ?? "N/A"}</p>
								</div>
								<div className=" text-center">
									<h5>Porter's Contact</h5>
									<p>{hostel.portersContact ?? "N/A"}</p>
								</div>
							</div>
							<div className="show-flex-display">
								<div className=" text-center">
									<h5>Digital Address</h5>
									<p>{hostel.digitalAddress ?? "N/A"}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
