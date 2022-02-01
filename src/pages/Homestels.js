import React from "react";
import Hostel from "./components/Hostel";
const data = [
	{
		name: "Amen hostel",
		img: "Amen-Cover-img",
		location: "Boadi",
		distance: "7.6km",
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		name: "Amen hostel",
		img: "Amen-Cover-img",
		location: "Boadi",
		distance: "7.6km",
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		name: "Amen hostel",
		img: "Amen-Cover-img",
		location: "Boadi",
		distance: "7.6km",
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		name: "Amen hostel",
		img: "Amen-Cover-img",
		location: "Boadi",
		distance: "7.6km",
	},
];
export default function Homestels(props) {
	return (
		<>
			<div className="hostel-flex">
				{data &&
					data.map((item, index) => {
						return (
							<>
								<Hostel key={index} />
							</>
						);
					})}
			</div>
		</>
	);
}
