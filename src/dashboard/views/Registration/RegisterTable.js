import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AcademicYearModal from "./AcademicYearModal";
import { useNavigate } from "react-router-dom";
import blankData from "../../images/blank_svg.svg";
import CustomSpinner from "../../utils/CustomSpinner";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterTable(props) {
	const [user] = useState(JSON.parse(localStorage.getItem("user")));
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [Residences, setResidences] = useState([]);
	const [academic_year, setAcademicYear] = useState([]);
	const [year_selected, setYearSelected] = useState();
	const [selected_zone, setSelectedZone] = useState();
	const [zones, setZones] = useState([]);

	useEffect(() => {
		const fetchZones = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		const fetchYears = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/academic-year`,
			});
			setAcademicYear(res.data.data);
		};
		if (zones?.length === 0) {
			fetchZones();
		}
		if (academic_year?.length === 0) {
			fetchYears();
		}
	});

	const handleSearch = async (values) => {
		setYearSelected(values.years);
		setSelectedZone(values.zone);
		setIsLoading(true);
		try {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/registration/unreg/${values.zone}/${values.years}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data);
			setResidences(res.data.data);
			setTimeout(() => setIsLoading(false), 2000);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRegister = async (id) => {
		try {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/registration/register/${year_selected}/${id}/${user?._id}`,
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(res.data);
			const rs = res.data.data;
			Residences.forEach((el) => {
				if (el?._id === rs?._id) {
					el.status = rs?.status;
					el.createdAt = rs?.createdAt;
				}
			});
			toast.success("Registered Successfully");
			setResidences([...Residences]);
		} catch (err) {
			toast.error(err?.response?.data?.message);
			console.log(err?.response?.data?.message);
		}
	};

	const validationSchema = Yup.object({
		zone: Yup.string().required("zone is required"),
		years: Yup.string().required("academic year is required"),
	});

	const initialValues = {
		zone: selected_zone ?? "",
		years: year_selected ?? "",
	};
	return (
		<>
			<Button onClick={() => navigate("registered")}>Registered</Button>
			<div className="table-container">
				<h2 className="text-center mb-4">UnRegistered Residences Area</h2>
				<ToastContainer style={{ marginTop: 90 }} />
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						await handleSearch(values);
						resetForm();
					}}
				>
					<Form>
						<div className="row">
							<div className="col-md-4 coll-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="zone"
								>
									<option> Select Zone</option>
									{zones.map((item, i) => (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									))}
								</Field>

								<ErrorMessage name="zone" render={renderError} />
							</div>
							<div className="col-md-4 coll-sm-12 sm-view">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="years"
								>
									<option> Select Academic</option>
									{academic_year.map((item) => (
										<option key={item._id} value={item?.slug}>
											{item.years}
										</option>
									))}
								</Field>

								<ErrorMessage name="years" render={renderError} />
							</div>
							<div className="col-md-2 col-sm-12 mb-3">
								<Button type="submit " variant="success">
									Search
								</Button>
							</div>
							<div className="col-md-2 col-sm-12">
								<AcademicYearModal />
							</div>
						</div>
					</Form>
				</Formik>
				{isLoading ? (
					<CustomSpinner type="circle" />
				) : Residences.length === 0 ? (
					<div className="text-center">
						<img src={blankData} width={300} height={350} alt="...." />
						<p className="text-center">No Data Available</p>
					</div>
				) : (
					<table className="mt-4">
						<thead>
							<tr>
								<th>ID</th>
								<th>Residence Name</th>
								<th>Zone</th>
								<th>Date Registered</th>
								<th>Registration Status</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{Residences.length > 0 &&
								Residences.map((item, i) => (
									<tr key={item?._id}>
										<td>{i + 1}</td>
										<td>{item.name}</td>
										<td>{item?.zone}</td>
										<td>{item.createdAt}</td>

										<td className="text-center">
											{item.status === 1 ? (
												<Button variant="danger" disabled>
													{" "}
													Registered{" "}
												</Button>
											) : (
												<Button
													variant="success"
													onClick={() => handleRegister(item._id)}
												>
													Register
												</Button>
											)}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
}
