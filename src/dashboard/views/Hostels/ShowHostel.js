import React, { useEffect, useState } from "react";
import adombi from "../../../images/adom_bi.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";

export default function Showhostel(props) {
	let { id } = useParams();
	const [hostels, setHostels] = useState([]);
	const images = [
		{
			id: 1,
			original: "https:/picsum.photos/id/1015/400/350",
			thumbnail: "https:/picsum.photos/id/1015/250/150",
		},
		{
			id: 1,
			original: "https:/picsum.photos/id/1011/400/350",
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
			setHostels(res.data.data);
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-5 col-sm-12 ">
						<ImageGallery items={images} />
						{/* show images gallery */}
					</div>
					<div className="col-md-7 col-sm-12">
						<h3 className="text-center">{hostels.name}</h3>
						<div className="container">
							<h5>Description</h5>
							<p>
								display of multiple images display of multiple imagesdisplay of
								multiple imagesdisplay of multiple images display of multiple
								images display of multiple images
							</p>
						</div>
						<div className="show-flex-display">
							<div className="text-center">
								<h5>Owner's Name</h5>
								<p>{hostels.ownersName ?? "N/A"}</p>
							</div>
							<div className="text-center">
								<h5>Owner's Contact</h5>
								<p>{hostels.ownersContact ?? "N/A"}</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className="text-center">
								<h5>Manager's Name</h5>

								<p>{hostels.managersName ?? "N/A"}</p>
							</div>
							<div className="text-center">
								<h5>Manager's Contact</h5>
								<p>{hostels.managersContact ?? "N/A"}</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className=" text-center">
								<h5>Porter's Name</h5>
								<p>{hostels.portersContact ?? "N/A"}</p>
							</div>
							<div className=" text-center">
								<h5>Porter's Contact</h5>
								<p>{hostels.portersContact ?? "N/A"}</p>
							</div>
						</div>
						<div className="show-flex-display">
							<div className=" text-center">
								<h5>Digital Address</h5>
								<p>{hostels.digitalAddress ?? "N/A"}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
