import React from "react";
import Divisiontitle from "./DivisionTitle";
import Toptitle from "../TopTitle";

const data = [
	{
		id: 1,
		name: "Dr. James Sir",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: true,
		zone: "Ayeduase North",
	},
	{
		id: 2,
		name: "Dr. James Sir Kwame",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: true,
		zone: "Gaza Kentikrono",
	},
	{
		id: 3,
		name: "Dr. James Agyekum Ozzil",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: true,
		zone: "Ayeduase South",
	},
	{
		id: 4,
		name: "Dr. James Agyekum Ozzil",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: true,
		zone: "Ayeduase North",
	},
	{
		id: 5,
		name: "Dr. James Agyekum Ozzil",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: true,
		zone: "Ayeduase North",
	},
	{
		id: 6,
		name: "Dr. James Agyekum Ozzil",
		contact: "0542399377",
		img: "/imgs/person.jpg",
		current: false,
		zone: "Ayeduase North",
	},
];

export default function Snrtutors(props) {
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Senior Tutors" />
				<div className="content-left-side">
					<button className=" btn mb-4 ">ADD TUTOR</button>
				</div>
				<Divisiontitle title="CURRENT SENIOR TUTORS" />
				<div className="tutors-flex">
					{data.filters(!data.current).map((item) => {
						return (
							<div key={item.id} className="tutors-card">
								<img
									src={item.img}
									className="img-fluid"
									alt="..."
									style={{ width: 210, height: 200 }}
								/>
								<div>
									<p className="tutor-name">{item.name}</p>
									<p>{item.contact}</p>
									<p>{item.zone}</p>
								</div>

								<button className="btn form-control"> View</button>
							</div>
						);
					})}
				</div>
				<hr />
				<div>
					<Divisiontitle title="PAST SENIOR TUTORS" />
					<div className="tutors-flex">
						{data.map((item) => {
							return (
								<div key={item.id} className="tutors-card">
									<img
										src={item.img}
										className="img-fluid"
										alt="..."
										style={{ width: 210, height: 200 }}
									/>
									<div>
										<p className="tutor-name">{item.name}</p>
										<p>{item.contact}</p>
										<p>{item.zone}</p>
									</div>

									<button className="btn form-control"> View</button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
