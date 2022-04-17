import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export default function EditAreamp(props) {
	const { slug } = useParams();
	const [zones, setZones] = useState([]);
	const [tutors, setTutors] = useState([]);
	const [areaMp, setAreaMp] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		const fetchZones = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		const fetchTutors = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
			});
			setTutors(res.data.data);
		};

		const fetchAreaMp = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/area-mps/${slug}`,
			});
			setAreaMp(res.data.data);
		};
		!areaMp && fetchAreaMp();
		if (zones.length === 0) {
			fetchZones();
		}
		if (tutors.length === 0) {
			fetchTutors();
		}
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Residence is Required"),
		email: Yup.string()
			.email("TextField must be an Email")
			.required("Senior Tutor's email is required"),
		contact: Yup.string().required("Contact is required"),
		isCurrent: Yup.boolean().nullable(),
		image: Yup.string().nullable(),
	});

	const initialValues = {
		name: areaMp && (areaMp.name ?? ""),
		email: areaMp && (areaMp.email ?? ""),
		contact: areaMp && (areaMp.contact ?? ""),
		zone: areaMp && (areaMp.zone._id ?? ""),
		tutor: areaMp && (areaMp.tutor._id ?? ""),
		isCurrent: areaMp && (areaMp.isCurrent ?? ""),
		image: areaMp && (areaMp.image ?? ""),
	};
	const onSubmit = async (values) => {
		console.log(values);
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("zone", values.zone);
		formData.append("isCurrent", values.isCurrent);
		formData.append("image", values.image);

		const res = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/v1/area-mps/${areaMp._id}`,
			headers: {
				accept: "application/json",
			},
			data: formData,
		});
	};

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { resetForm }) => {
					await onSubmit(values);
					resetForm();
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="Name"
									name="name"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: Joshua Addo
								</p>
								<ErrorMessage name="name" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="Email Address"
									name="email"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: areamp@dos.com
								</p>
								<ErrorMessage name="email" render={renderError} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="tel"
									className="form-control"
									placeholder="contact"
									name="contact"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: 0542399377
								</p>
								<ErrorMessage name="contact" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Zones"
									name="zone"
								>
									<option value=""> select zone</option>
									{zones &&
										zones.map((item) => (
											<option key={item._id} value={item._id}>
												{item.name}
											</option>
										))}
								</Field>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: Ayeduase-North
								</p>
								<ErrorMessage name="zone" render={renderError} />
							</div>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									<Field
										as="select"
										className="form-select"
										placeholder="Zones"
										name="tutor"
									>
										<option value=""> select Tutor</option>
										{tutors &&
											tutors.map((item) => (
												<option key={item._id} value={item._id}>
													{item.name}
												</option>
											))}
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Dr. Osei Mensah
									</p>
									<ErrorMessage name="tutor" render={renderError} />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									{areaMp && areaMp.image ? (
										<img
											src={`${url}/area-mps/${areaMp.image}`}
											className="img-fluid"
											alt="..."
											style={{ width: 300, height: 250 }}
										/>
									) : (
										<img
											src={`${url}/snrtutors/PASSPORT_MTN.jpg`}
											className="img-fluid"
											alt="..."
											style={{ width: 300, height: 250 }}
										/>
									)}
								</div>
								<div className="col-md-3 col-sm-12">
									<label>Load Profile Image</label>
									<input
										type="file"
										className="form-control"
										onChange={(e) => {
											setFieldValue("image", e.currentTarget.files[0]);
										}}
									/>
									<ErrorMessage name="image" render={renderError} />
								</div>
								<div className="col-md-3 col-sm-12 ">
									<label>
										<b>Current Status</b>
									</label>
									<Field
										as="select"
										name="isCurrent"
										className="form-select"
										aria-label="Default select example"
									>
										<option>Select Status</option>
										<option value={true}>Current</option>
										<option value={false}>Past</option>
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Current
									</p>
									<ErrorMessage name="isCurrent" render={renderError} />
								</div>
							</div>
						</div>
						<div className="mt-3">
							<button type="submit" className="btn is-primary">
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
