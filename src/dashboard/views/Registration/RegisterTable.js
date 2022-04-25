import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AcademicYearModal from "./AcademicYearModal";

export default function RegisterTable(props) {
	const [employees, setEmployees] = useState([]);
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
		try {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/registration/${values.zone}/${values.years}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res.data);
			setResidences(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const paySalary = async (id) => {
		try {
			const res = await axios({
				method: "post",
				url: ``,
				headers: {
					"Content-Type": "application/json",
				},
			});
			const curr_emp = employees;
			console.log(res.data, employees);
			curr_emp.forEach((el) => {
				if (el.employee._id === res.data?.rs?.employee) {
					el.status = res.data.rs?.status;
				}
			});

			setEmployees([...curr_emp]);
		} catch (err) {
			console.log(err);
		}
	};

	const validationSchema = Yup.object({
		zone: Yup.string().required("zone is required"),
		years: Yup.string().required("academic year is required"),
	});

	const initialValues = {
		zone: "",
		years: "",
	};
	return (
		<>
			<div className="table-container">
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
				<div></div>
				<table className="mt-4">
					<thead>
						<tr>
							<th>ID</th>
							<th>Residence Name</th>
							<th>Zone</th>
							<th>Date Registered</th>
							<th>Registration Status</th>
							<th className="text-center">Action</th>
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
												onClick={() => paySalary(item._id)}
											>
												Register
											</Button>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}
