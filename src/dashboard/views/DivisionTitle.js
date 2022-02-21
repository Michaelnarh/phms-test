import React from "react";

export default function Divisiontitle(props) {
	const { title } = props;
	return (
		<>
			<div className="division-title">
				<span>------</span>
				<h3 className="head-title">{title}</h3>
				<span>-----</span>
				<hr />
			</div>
		</>
	);
}
