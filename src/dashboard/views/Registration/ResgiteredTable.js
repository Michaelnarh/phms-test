import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoIosCheckmarkCircle, IoIosLock } from "react-icons/io";
import AcademicYearModal from "./AcademicYearModal";
import blankData from "../../images/blank_svg.svg";
import CustomSpinner from "../../utils/CustomSpinner";
// import { ContextStore } from "./../../../store/ContextStore";

export default function RegisteredTable(props) {
	const [user] = useState(JSON.parse(localStorage.getItem("user")));
	const [isLoading, setIsLoading] = useState(false);
	const [Residences, setResidences] = useState([]);
	const [academic_year, setAcademicYear] = useState([]);
	const [year_selected, setYearSelected] = useState();
	const [selected_zone, setSelectedZone] = useState();

	const [zones, setZones] = useState([]);

	useEffect(() => {
		const fetchZones = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		const fetchYears = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/academic-year`,
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
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/registration/reg/${values.zone}/${values.years}`,
				headers: {
					"Content-Type": "application/json",
				},
			});

			setResidences(res.data.data);
			setTimeout(() => setIsLoading(false), 2000);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDisabled = async (id) => {
		try {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}/api/v1/registration/register/${year_selected}/${id}/${user?._id}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			let curr_residences = Residences;
			// console.log(res.data, employees);
			curr_residences.forEach((el) => {
				if (el._id === res.data._id) {
					el.status = res.data?.status;
					el.createdAt = res.data?.createdAt;
				}
			});

			setResidences([...curr_residences]);
		} catch (err) {
			console.log(err);
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
			<div className="table-container">
				<h2 className="text-center mb-4"> Registered Residences Area</h2>
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
							<div className="col-md-4 coll-sm-12">
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
							<div className="col-md-2 col-sm-12">
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
				<div>
					<h3 className="text-center">Search Results</h3>
					<p></p>
				</div>
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
								<th className="text-center">Registration Status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{Residences.map((item, i) => (
								<tr key={item?.name}>
									<td>{i + 1}</td>
									<td>{item.name}</td>
									<td>{item?.zone}</td>
									<td>{item.createdAt}</td>

									<td className="text-center">
										{item.status === 1 ? (
											<Button variant="danger" disabled>
												{" "}
												Registered{" "}
												<span>
													<IoIosCheckmarkCircle size={15} />
												</span>
											</Button>
										) : (
											<Button
												variant="success"
												onClick={() => handleDisabled(item._id)}
											>
												Register
											</Button>
										)}
									</td>
									<td className="text-center">
										<p oncClick={() => handleDisabled(item?._id)}></p>
										<IoIosLock size={25} color="orange" />
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
