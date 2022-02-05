import React from "react";
import Hostel from "./components/Hostel";
import Searchbox from "./components/SearchBox";
const data = [
	{
		name: "Family Renewal",
		img: "/imgs/family-renewal.jpg",
		location: "Ayeduase",
		distance: 10,
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		name: "Nana Kesse's House",
		img: "/imgs/homestel.jpg",
		location: "Ayeduase",
		distance: 12,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		name: "El-shaddai",
		img: "/imgs/download.png",
		location: "Ayeduase",
		distance: 16,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		name: "Koveland Homestel",
		img: "/imgs/download.png",
		location: "Ayeduase",
		distance: 15,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
];
export default function Hostels(props) {
	return (
		<>
			<div className="container">
				<div>
					<Searchbox data={data} />
				</div>
				<div className="hostel-flex mt-5">
					{data &&
						data.map((item, index) => {
							return (
								<>
									<Hostel data={item} key={index} />
								</>
							);
						})}
				</div>
			</div>
		</>
	);
}
