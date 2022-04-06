import React from "react";
import { MdLocationOn } from "react-icons/md";

export default function Locationmaker({ lat, lng, onClick }) {
	return (
		<>
			<div>
				<MdLocationOn size={25} color="red" onClick={onClick} />
			</div>
		</>
	);
}
