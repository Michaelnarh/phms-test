import React from "react";
import { FaChartPie } from "react-icons/fa";

export default function Emptypage(props) {
	return (
		<>
			{/* <SearchBox /> */}
			<div className="container mt-3 mb-3  ">
				<div className="card-box-flex">
					<div className="card-box">
						<div className="card-box-inlineflex">
							<div>
								<p>HOSTELS</p>
								<h1>97</h1>
							</div>
							<div>
								<FaChartPie size={58} color="green" />
							</div>
						</div>
					</div>
					<div className="card-box">
						<div className="card-box-inlineflex">
							<div>
								<p>HOMESTELS</p>
								<h1>10,097</h1>
							</div>
							<div>
								<FaChartPie size={58} color="red" />
							</div>
						</div>
					</div>
					<div className="card-box">
						<div className="card-box-inlineflex">
							<div>
								<p>REGISTERED HOSTELS</p>
								<h1>10,097</h1>
							</div>
							<div>
								<FaChartPie size={58} color="orange" />
							</div>
						</div>
					</div>
					<div className="card-box">
						<div className="card-box-inlineflex">
							<div>
								<p>REGISTERED HOSTELS</p>
								<h1>10,097</h1>
							</div>
							<div>
								<FaChartPie size={58} color="purple" />
							</div>
						</div>
					</div>
				</div>
				<h1 style={{ marginBottom: 55 }}>Page 1</h1>
			</div>
		</>
	);
}
