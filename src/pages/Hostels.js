import React from "react";
import Hostel from "./components/Hostel";
import Searchbox from "./components/SearchBox";

const data = [
	{
		id: 1,
		name: "Adom Bi",
		img: "/imgs/adom_bi.jpg",
		location: "ayeduase",
		distance: 5,
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		id: 2,
		name: "Amen hostel",
		img: "/imgs/amen-.jpg",
		location: "ayeduase",
		distance: 6,
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		id: 3,
		name: "J&J hostel",
		img: "/imgs/jj.jpg",
		location: "Kotei",
		distance: 4.6,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 4,
		name: "Nana Adoma Hostel",
		img: "/imgs/nana-adoma.jpg",
		location: "ayeduase",
		distance: 2,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 5,
		name: "White house Hostel",
		img: "imgs/white-house.jpg",
		location: "Ayeduase",
		distance: 3,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 6,
		name: "Canam Hall",
		img: "imgs/canam-hall-2.jpg",
		location: "Ayeduase",
		distance: 12,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 7,
		name: "Frontline Court",
		img: "imgs/frontline-court.jpg",
		location: "Ayeduase",
		distance: 8,
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
									<Hostel data={item} key={item.id} />
								</>
							);
						})}
				</div>
			</div>
		</>
	);
}
