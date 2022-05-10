import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";

export default function EditAssemblyMem(props) {
	const { slug } = useParams();
	const [aMember, setAMember] = useState([]);
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		const fetchAssemblyMember = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/assembly-members/${slug}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setAMember(res.data.data);
		};
		fetchAssemblyMember();
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
		name: aMember && (aMember?.name ?? ""),
		email: aMember && (aMember?.email ?? ""),
		contact: aMember && (aMember?.contact ?? ""),
		isCurrent: aMember && (aMember?.isCurrent ?? ""),
		zone: aMember && (aMember?.zone?._id ?? ""),
		image: aMember && (aMember?.image ?? ""),
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
			url: `${process.env.REACT_APP_API_URL}/api/v1/assembly-members${slug}`,
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
									<span className="required">*</span> Example: Hon. Gideon Addo
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
									assemblyman@gmail.com
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
						<div className="row mt-3">
							<div className="col-md-6 col-sm-12">
								{aMember && aMember.image ? (
									<img
										src={`${url}/nss-personnels/${aMember.image}`}
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
