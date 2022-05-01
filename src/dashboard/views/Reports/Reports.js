import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChartPie, FaArrowRight } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import Toptitle from "./../TopTitle";
import CustomSpinner from "./../../utils/CustomSpinner";

const Reports = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({});
	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/statistics`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setData(res.data.data);
			setIsLoading(false);
		};

		const timer = setTimeout(() => fetchData(), 2000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<div className=" page-container mt-3 mb-3  ">
				<Toptitle page="Reports" />
				{isLoading ? (
					<CustomSpinner type="beat" />
				) : (
					<div className="card">
						<div className="card-box-flex">
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>HOSTELS</p>
										<h1>{data.hostels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="green" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>HOMESTELS</p>
										<h1>{data.homestels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="red" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>REG HOSTELS</p>
										<h1>{data.reg_hostels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="orange" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>REG HOMESTELS</p>
										<h1>{data.reg_homestels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p> CONSTITUENCIES</p>
										<h1>{data.zones_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>OWNERS </p>
										<h1>{data.snr_tutors_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>MANAGERS </p>
										<h1>{data.nssP_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>PORTERS</p>
										<h1>{data.area_mp_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<FaArrowRight size={30} color="#ccc" />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Reports;
