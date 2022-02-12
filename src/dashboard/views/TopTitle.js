import React from "react";
let now = new Date();
export default function Toptitle(props) {
	const { page } = props;

	return (
		<>
			<div className="top-title-flex">
				<div>
					<h3 className="bread-crums">Dashboard / {page}</h3>
				</div>
				<div>{now.toLocaleString()}</div>
			</div>
		</>
	);
}
