import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export default function EditNationalMp(props) {
	const { slug } = useParams();
	const [nmp, setNmps] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		const fetchNationalMps = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/${slug}`,
			});
			setNmps(res.data.data);
		};

		!nmp && fetchNationalMps();
	}, []);

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
		name: nmp && (nmp.name ?? ""),
		email: nmp && (nmp.email ?? ""),
		contact: nmp && (nmp.contact ?? ""),
		zone: nmp && (nmp.zone._id ?? ""),
		image: nmp && (nmp.image ?? ""),
	};
	const onSubmit = async (values) => {
		console.log(values);
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("isCurrent", values.isCurrent);
		formData.append("image", values.image);

		const res = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors${slug}`,
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
									<span className="required">*</span> Example: Nana Adoma
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
									seniortutor@gmail.com
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
