import React, { useEffect, useState } from "react";
import { FaChartPie, FaUserCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "./../utils/AxiosInstance";
import {
	MdOutlineVerifiedUser,
	MdLocationOn,
	MdHouse,
	MdApartment,
	MdAppRegistration,
} from "react-icons/md";
// import { Doughnut, Bar } from "react-chartjs-2";
import Toptitle from "./TopTitle";
import CustomSpinner from "../utils/CustomSpinner";

// const data = {
// 	datasets: [
// 		{
// 			// backgroundColor: colors.indigo[500],
// 			data: [18, 5, 19, 27, 29, 19, 20],
// 			label: "This year",
// 		},
// 		{
// 			// backgroundColor: colors.grey[200],
// 			data: [11, 20, 12, 29, 30, 25, 13],
// 			label: "Last year",
// 		},
// 	],
// 	labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug"],
// };
// const options = {
// 	animation: false,
// 	cornerRadius: 20,
// 	layout: { padding: 0 },
// 	legend: { display: false },
// 	maintainAspectRatio: false,
// 	responsive: true,
// 	scales: {
// 		xAxes: [
// 			{
// 				barThickness: 12,
// 				maxBarThickness: 10,
// 				barPercentage: 0.5,
// 				categoryPercentage: 0.5,
// 				ticks: {
// 					// fontColor: theme.palette.text.secondary
// 				},
// 				gridLines: {
// 					display: false,
// 					drawBorder: false,
// 				},
// 			},
// 		],
// 		yAxes: [
// 			{
// 				ticks: {
// 					// fontColor: theme.palette.text.secondary,
// 					beginAtZero: true,
// 					min: 0,
// 				},
// 				gridLines: {
// 					borderDash: [2],
// 					borderDashOffset: [2],
// 					// color: theme.palette.divider,
// 					drawBorder: false,
// 					zeroLineBorderDash: [2],
// 					zeroLineBorderDashOffset: [2],
// 					// zeroLineColor: theme.palette.divider
// 				},
// 			},
// 		],
// 	},
// 	tooltips: {
// 		backgroundColor: "blue",
// 		//   bodyFontColor: theme.palette.text.secondary,
// 		//   borderColor: theme.palette.divider,
// 		borderWidth: 1,
// 		enabled: true,
// 		//   footerFontColor: theme.palette.text.secondary,
// 		intersect: false,
// 		mode: "index",
// 		//   titleFontColor: theme.palette.text.primary
// 	},
// };

export default function Dashboard(props) {
	const [isLoading, setIsLoading] = useState(false);
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
			toast.success("You are welcome");
			console.log(res.data);
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
			console.log(res.data);
		};

		!reports && fetchReports();
		// fetchData();

		const timer = setTimeout(() => {
			fetchData();
		}, 2000);

		return () => clearTimeout(timer);
	}, [reports]);
	return (
		<>
			<div className=" page-container mt-3 mb-3  ">
				<Toptitle page="Home" />
				{isLoading ? (
					<CustomSpinner isLoading={isLoading} type="hash" />
				) : (
					<div className="card">
						<ToastContainer style={{ marginTop: 90 }} className="top-margin" />
						<div className="card-box-flex">
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>AVAILABLE HOSTELS</p>
										<h1>{data.hostels_num}</h1>
									</div>
									<div>
										<MdApartment size={58} color="green" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>AVAILABLE HOMESTELS</p>
										<h1>{data.homestels_num}</h1>
									</div>
									<div>
										<MdHouse size={58} color="red" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>REGISTERED HOSTELS</p>
										<h1>{reports && reports?.hostelsCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="orange" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>REGISTERED HOMESTELS</p>
										<h1>{reports && reports?.homestelsCount}</h1>
									</div>
									<div>
										<FaChartPie size={58} color="purple" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>ZONES / CONSTITUENCIES</p>
										<h1>{data.zones_num}</h1>
									</div>
									<div>
										<MdLocationOn size={58} color="purple" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>SENIOR TUTORS</p>
										<h1>{data.snr_tutors_num}</h1>
									</div>
									<div>
										<FaUserCheck size={58} color="purple" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>NSS PERSONNELS</p>
										<h1>{data.nssP_num}</h1>
									</div>
									<div>
										<MdOutlineVerifiedUser size={58} color="purple" />
									</div>
								</div>
							</div>
							<div className="card-box">
								<div className="card-box-inlineflex">
									<div>
										<p>STUDENT MPS</p>
										<h1>{data.student_mp_num}</h1>
									</div>
									<div>
										<MdAppRegistration size={58} color="purple" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* <Bar data={data} width={3} height={3} options={options} /> */}
				{/* <h1 style={{ marginBottom: 55 }}>Page 1</h1> */}
			</div>
		</>
	);
}
