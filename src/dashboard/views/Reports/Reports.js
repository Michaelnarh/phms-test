import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import AxiosInstance from "../../utils/AxiosInstance";
import { FaChartPie, FaArrowRight } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import Toptitle from "./../TopTitle";
import CustomSpinner from "./../../utils/CustomSpinner";
import { Button } from "react-bootstrap";

const Reports = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [innerLoad, setInnerLoad] = useState(false);
	const [data, setData] = useState({});
	const [reports, setReports] = useState();
	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/residences/statistics`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setData(res.data.data);
			setIsLoading(false);
		};
		const fetchReports = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/statistics`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setReports(res.data.data);
			setIsLoading(false);
			console.log(res.data);
		};

		!reports && fetchReports();

		const timer = setTimeout(() => fetchData(), 1000);

		return () => clearTimeout(timer);
	}, [reports]);

	const handleRegistered = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/registered`,
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handleHomestels = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/homestels`,
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleHostels = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/hostels`,
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handleOwners = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/owners`,
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handleMangers = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: `/api/v1/reports/managers`,
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handlePorters = () => {
		setInnerLoad(true);
		const minfunc = async () => {
			try {
				await AxiosInstance({
					method: "get",
					url: `/api/v1/reports/porters`,
					headers: {
						"Content-Type": "application/pdf",
					},
				});

				setInnerLoad(false);
			} catch (err) {}
		};

		let timer = setTimeout(() => minfunc(), 2000);

		return () => clearTimeout(timer);
	};
	return (
		<>
			<div className=" page-container mt-3 mb-3  ">
				<Toptitle page="Reports" />
				{isLoading ? (
					<CustomSpinner type="beat" />
				) : (
					<div className="card">
						<div className="card-box-flex">
							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>HOSTELS</p>
										<h1>{data.hostels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<Button onClick={() => handleHostels()}>
									{" "}
									Generate Report
								</Button>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>HOMESTELS</p>
										<h1>{data.homestels_num}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<Button onClick={() => handleHomestels()}>
									{" "}
									Generate Report
								</Button>
								<FaArrowRight size={30} color="#ccc" />
							</div>

							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>REG RESIDENCES</p>
										<h1>{reports && reports?.residencesCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<Button onClick={() => handleRegistered()}>
									{" "}
									Generate Report
								</Button>
								<FaArrowRight size={30} color="#ccc" />
							</div>

							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>OWNERS </p>
										<h1>{reports && reports?.ownersCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<Button onClick={() => handleOwners()}> Generate Report</Button>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>MANAGERS </p>
										<h1>{reports && reports?.managersCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
								<Button onClick={() => handleMangers()}>
									{" "}
									Generate Report
								</Button>
								<FaArrowRight size={30} color="#ccc" />
							</div>
							<div className="card-box-report">
								<div className="card-box-inlineflex">
									<div>
										<p>PORTERS</p>
										<h1>{reports && reports?.portersCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>

								<>
									<Button onClick={() => handlePorters()}>
										{" "}
										Generate Report
									</Button>
									<FaArrowRight size={30} color="#ccc" />
								</>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Reports;
