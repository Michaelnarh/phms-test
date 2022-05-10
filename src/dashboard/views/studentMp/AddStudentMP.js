import React, { useState, useEffect } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AddStudentMp(props) {
	const [zones, setZones] = useState([]);
	const [tutors, setTutors] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchZones = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		const fetchTutors = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/senior-tutors`,
			});
			setTutors(res.data.data);
		};

		if (zones.length === 0) {
			fetchZones();
		}
		if (tutors.length === 0) {
			fetchTutors();
		}
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is Required"),
		email: Yup.string()
			.email("TextField must be an Email")
			.required("Email is required"),
		contact: Yup.string().required("Contact is required"),
		// zone: Yup.string().required("Zone is required"),
		// tutor: Yup.string().required("tutor is required"),
		image: Yup.string().nullable(),
	});

	const initialValues = {
		name: "",
		email: "",
		contact: "",
		zone: "",
		tutor: "",
		image: "",
	};
	const onSubmit = async (values) => {
		console.log(values);
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("zone", values.zone);
		formData.append("tutor", values.tutor);
		formData.append("image", values.image);
		console.log(formData.entries());
		try {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/student-mps`,
				headers: {
					"Content-Type": "multipart/form-data",
					accept: "application/json",
				},
				data: formData,
			});
			if (res.data.status === "success") {
				navigate("/admin/student-mps");
			}
		} catch (err) {
			if (err?.data?.response) {
				toast(err.data?.response?.message, { position: "top-center" });
			}
		}
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
						<ToastContainer className="top-margin" />
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="Name"
									name="name"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: Johnson Owen
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
									<option value=""> select Zone</option>
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
								<div className="col-md-6 col-sm-12">
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
