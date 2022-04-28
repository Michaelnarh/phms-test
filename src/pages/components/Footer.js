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
						<div className=" footer-text mt-2 text-center">
							Copyright &copy; {new Date().getFullYear()} Made with Love by{" "}
							<b>SuperLax Technologies &reg;</b>{" "}
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
							<path
								fill="#0a6e23"
								fillOpacity="1"
								d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,133.3C960,160,1056,224,1152,229.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
							></path>
						</svg>
					</div>
				</div>
			</footer>
		</>
	);
}
