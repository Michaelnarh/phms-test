import React, { useState, useEffect } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AddAssemblyMem(props) {
	const [zones, setZones] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchZones = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		fetchZones();
	}, []);

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is Required"),
		email: Yup.string()
			.email("TextField must be an Email")
			.required("Senior Tutor's email is required"),
		contact: Yup.string().required("Contact is required"),
		// zone: Yup.string().required("Zone is required"),
		image: Yup.string().nullable(),
	});

	const initialValues = {
		name: "",
		email: "",
		contact: "",
		image: "",
	};
	const onSubmit = async (values) => {
		console.log(values);
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("zone", values.zone);
		formData.append("image", values.image);

		console.log(formData.entries());

		const res = await AxiosInstance({
			method: "post",
			url: `/api/v1/assembly-members`,
			headers: {
				"Content-Type": "multipart/form-data",
				accept: "application/json",
			},
			data: formData,
		});
		if (res.data.status === "success") {
			navigate("/admin/assembly-members");
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
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="Name"
									name="name"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: Hon. Akwasi
									Arthur
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
									<span className="required">*</span> Example:
									assemblyMember@gmail.com
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
							<div className="row mt-3">
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
