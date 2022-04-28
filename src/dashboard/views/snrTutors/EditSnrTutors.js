import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import * as Yup from "yup";

export default function Editsnrtutors(props) {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [zones, setZones] = useState([]);
	const [tutor, setTutor] = useState();
	const url = `${process.env.REACT_APP_API_URL}/images`;
	useEffect(() => {
		const fetchZones = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones`,
			});
			setZones(res.data.data);
		};

		const fetchTutor = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/${slug}`,
			});
			setTutor(res.data.data);
		};
		!tutor && fetchTutor();
		if (zones.length === 0) {
			fetchZones();
		}
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Residence is Required"),
		email: Yup.string()
			.email("TextField must be an Email")
			.required("Senior Tutor's email is required"),
		contact: Yup.string().required("Contact is required"),
		// zone: Yup.string().required("Zone is required"),
		image: Yup.string().nullable(),
	});

	const initialValues = {
		name: tutor && (tutor.name ?? ""),
		email: tutor && (tutor.email ?? ""),
		contact: tutor && (tutor.contact ?? ""),
		zone: tutor && (tutor.zone._id ?? ""),
		image: tutor && (tutor.image ?? ""),
	};
	const onSubmit = async (values) => {
		var formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("zone", values.zone);
		formData.append("image", values.image);

		const res = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/${tutor._id}`,
			headers: {
				"Content-Type": "multipart/form-data",
				accept: "application/json",
			},
			data: formData,
		});

		if (res.data.status === "success") {
			navigate(-1);
		}
	};
	const handleDelete = async (id) => {
		const res = await axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors/${id}`,
		});
		if (res.data.status === "success") {
			navigate("/admin/snr-tutors");
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
									{tutor && tutor.image ? (
										<img
											src={`${url}/snr-tutors/${tutor.image}`}
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
