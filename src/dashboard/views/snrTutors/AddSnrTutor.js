import React from "react";
import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export default function Addsnrtutor(props) {
	const validationSchema = Yup.object({
		name: Yup.string().required("Residence is Required"),
		email: Yup.string().email("Senior Tutor's email is required"),
		contact: Yup.string().required("Contact is Required"),
		zone: Yup.string(),
		image: Yup.string(),
	});

	const initialValues = {
		name: "",
		email: "",
		contact: "",
		zone: "",
	};
	const onSubmit = async (values) => {
		alert(JSON.stringify(values, null, 2));
		console.log(values);
		const res = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
			headers: {
				"Content-Type": "mutipart/form-data",
			},
			data: values,
		});
	};
	const renderError = (message) => <p className="text-danger">{message}</p>;
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={async (values, { resetForm }) => {
					console.log(values);
					await onSubmit(values);
					resetForm();
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<div className="row">
							<div className="col-md-4 col-sm-12">
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
							<div className="col-md-4 col-sm-12">
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
							<div className="col-md-4 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="contact"
									name="contact"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: 0542399377
								</p>
								<ErrorMessage name="contact" render={renderError} />
							</div>
							<div className="col-md-4 col-sm-12">
								<Field
									type="select"
									className="form-control"
									placeholder="Zone "
									name="zone"
								/>
								<p className="eg-text">
									<span className="required">*</span> Ayeduase North
								</p>
								<ErrorMessage name="zone" render={renderError} />
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
