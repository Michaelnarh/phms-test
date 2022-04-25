import React from "react";

export function Footer(props) {
	return (
		<>
			<footer className="footer-style">
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
					<div>
						<div className="text-center footer-text mt-3">
							Copyright &copy; {new Date().getFullYear()} Made with Love by{" "}
							<b>SuperLax Technologies &reg;</b>{" "}
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
							<path
								fill="#0a6e23"
								fill-opacity="1"
								d="M0,64L48,58.7C96,53,192,43,288,58.7C384,75,480,117,576,154.7C672,192,768,224,864,218.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
							></path>
						</svg>
					</div>
				</div>
			</footer>
		</>
	);
}
