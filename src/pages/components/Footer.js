import React from "react";

export function Footer(props) {
	return (
		<>
			<div>
				{/* <div className="row">
					<div className="col-md-4 col-sm-6">Supervised By: Dr. James</div>
					<div className="col-md-8 col-sm-6">
						Project By:
						<ul>
							<li>Michael Narh</li>
							<li>Ben Smit</li>
							<li>Ben Carson</li>
							<li>Emmanuel Acquah</li>
						</ul>
					</div>
				</div> */}
				<div className="text-center  mt-3">
					Copyright &copy; {new Date().getFullYear()} Made with Love by{" "}
					<b>SuperLax Technologies &reg;</b>{" "}
				</div>
			</div>
		</>
	);
}
