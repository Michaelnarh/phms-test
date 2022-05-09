import React, { useState, useEffect } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";
import AxiosInstance from "../../utils/AxiosInstance";

export default function EditPersonnel(props) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { slug } = useParams();
	const [tutors, setTutors] = useState([]);
	const [personnel, setPersonnel] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		setIsLoading(true);
		const fetchTutors = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/senior-tutors`,
			});
			setTutors(res.data.data);
		};

		const fetchPersonnel = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/nss-personnels/${slug}`,
			});
			setPersonnel(res.data.data);
			setIsLoading(false);
		};
		// !personnel && fetchPersonnel();

		fetchTutors();

		const timer = setTimeout(() => fetchPersonnel(), 2000);

		return () => clearTimeout(timer);
	}, [slug]);

	const validationSchema = Yup.object({
		name: Yup.string().required("Personnnel name  is Required"),
		email: Yup.string()
			.email("TextField must be an Email")
			.required("Personnel email is required"),
		contact: Yup.string().required("Contact is required"),
		isCurrent: Yup.boolean().nullable(),
		// zone: Yup.string().required("Zone is required"),
		image: Yup.string().nullable(),
	});

	const initialValues = {
		name: personnel && (personnel.name ?? ""),
		email: personnel && (personnel.email ?? ""),
		contact: personnel && (personnel.contact ?? ""),
		isCurrent: personnel && (personnel.isCurrent ?? ""),
		tutor: personnel && (personnel.tutor ? personnel.tutor._id : ""),
		image: personnel && (personnel.image ?? ""),
	};
	const onSubmit = async (values) => {
		console.log(values);
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("tutor", values.tutor);
		formData.append("isCurrent", values.isCurrent);
		formData.append("image", values.image);

		try {
			const res = await AxiosInstance({
				method: "patch",
				url: `/api/v1/nss-personnels/${personnel._id}`,
				headers: {
					accept: "application/json",
				},
				data: formData,
			});
			setPersonnel(res.data.data);
			navigate("/admin/nss-personnels");
		} catch (err) {}
	};

	return (
		<>
			{isLoading ? (
				<CustomSpinner type="circle" />
			) : (
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
										<span className="required">*</span> Example:Prince Ben-Smith
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
								<div className="col-md-6 col-sm-12">
									<Field
										as="select"
										className="form-select"
										placeholder="Zones"
										name="tutor"
									>
										<option value=""> Select Senior Tutor</option>
										{tutors &&
											tutors.map((item) => (
												<option key={item._id} value={item._id}>
													{item.name}
												</option>
											))}
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Dr. James Osei
										Mensah
									</p>
									<ErrorMessage name="tutor" render={renderError} />
								</div>
								<div className="row mt-3">
									<div className="col-md-6 col-sm-12">
										{personnel && personnel.image ? (
											<img
												src={`${url}/nss-personnels/${personnel.image}`}
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
			)}
		</>
	);
}
