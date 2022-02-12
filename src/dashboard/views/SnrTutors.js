import React from "react";
import { CustomButton } from "./styledComponent";

const data = [
	{
		id: 1,
		name: "Dr. James Sir",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		zone: "Ayeduase North",
	},
	{
		id: 2,
		name: "Dr. James Sir",
		contact: "0542399377",
		img: "/imgs/person",
		zone: "Ayeduase North",
	},
	{
		id: 3,
		name: "Dr. James Agyekum Ozzil",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		zone: "Ayeduase North",
	},
];

export default function Snrtutors(props) {
	return (
		<>
			<div className="page-container mt-3">
				<div className="tutors-flex">
					{data.map((item) => {
						return (
							<div className="tutors-card">
								<img
									src={item.img}
									className="img-fluid"
									alt="..."
									style={{ width: 210, height: 250 }}
								/>
								<div>
									<h5 className="tutor-name">{item.name}</h5>
								</div>
								<div>
									<div>
										<p>{item.contact}</p>
									</div>
								</div>
								<div>
									<p>{item.zone}</p>
								</div>

								<button className="darkBlue form-control"> View</button>
							</div>
						);
					})}
				</div>
			</div>
			<h2>Senior Tutors Section</h2>
		</>
	);
}
