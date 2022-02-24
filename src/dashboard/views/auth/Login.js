import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Login(props) {
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			// .matches("/([0-9])+([a-zA-Z])*/")
			.required("password  is Required"),
	});

	const initialValues = {
		email: "",
		password: "",
	};

	const renderError = (message) => <p className="text-danger">{message}</p>;

	const handleSubmit = async (values) => {
		alert(JSON.stringify(values, null, 2));
		const res = await axios({
			method: "post",
			url: "http://127.0.0.1:8080/api/v1/users/login",

			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(values),
		});
		console.log(res);
	};
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);
					resetForm();
				}}
			>
				<Form>
					<div className="container  ">
						<div className="center-center-login">
							<h3> Admin LogIn</h3>
							<div className="container">
								<div className="ro">
									<div className=" col-md-4 col-sm-12 mx-auto">
										<Field
											type="email"
											className="form-control"
											placeholder="email"
											name="email"
										/>
										<p className="eg-text">
											<span className="required">*</span> Example:
											netuser@gmail.com
										</p>
										<ErrorMessage name="email" render={renderError} />
									</div>
									<div className=" mx-auto col-md-4 col-sm-12">
										<Field
											type="password"
											className="form-control"
											placeholder="password"
											aria-label="location"
											name="password"
										/>
										<p className="eg-text">
											<span className="required">*</span>
										</p>
										<ErrorMessage name="password" render={renderError} />
									</div>
									<div className="col-md-4 col-sm-12 mx-auto">
										<button
											type="submit"
											className="btn form-control text-center mt-3"
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
}
