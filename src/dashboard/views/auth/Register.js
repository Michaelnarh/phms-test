import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import process from "process";
export default function Register(props) {
	const validationSchema = Yup.object({
		username: Yup.string().required("Email is Required"),
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			.matches(
				"(?=^.{6,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
			)
			.required("password  is Required"),
		passwordConfirm: Yup.string()
			.required("password  is Required")
			.oneOf([Yup.ref("password")], "Your passwords do not match."),
		role: Yup.string(),
	});

	const initialValues = {
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		role: "",
	};

	const renderError = (message) => <p className="text-danger">{message}</p>;

	const handleSubmit = async (values) => {
		alert(JSON.stringify(process.env.REACT_API_URL));
		alert(JSON.stringify(values, null, 2));
		const res = await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URl}/api/v1/users/signup`,

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
						<div className="center-center-signup">
							<h3> Admin Sign Up</h3>
							<div className="container">
								<div className="r">
									<div className="show-flex">
										<div className=" col-md-4 col-sm-12 ">
											<Field
												type="text"
												className="form-control"
												placeholder="username"
												name="username"
											/>
											<p className="eg-text">
												<span className="required">*</span> Example: michaelnarh
											</p>
											<ErrorMessage name="username" render={renderError} />
										</div>
										<div className=" col-md-4 col-sm-12 ">
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
									</div>
									<div className="show-flex">
										<div className=" col-md-4 col-sm-12">
											<Field
												type="password"
												className="form-control"
												placeholder="password"
												name="password"
											/>
											<p>
												<span className="required">*</span>
											</p>
											<ErrorMessage name="password" render={renderError} />
										</div>
										<div className=" col-md-4 col-sm-12">
											<Field
												type="password"
												className="form-control"
												placeholder="password"
												name="passwordConfirm"
											/>
											<p className="eg-text">
												<span className="required">*</span>
											</p>
											<ErrorMessage
												name="passwordConfirm"
												render={renderError}
											/>
										</div>
									</div>
									<div className="col-md-4 col-sm-12 mx-auto ">
										<Field as="select" name="role" className="form-select">
											<option>Select User Role</option>
											<option value="user">User</option>
											<option value="maintainer">Maintainer</option>
											<option value="supervisor">Supervisor</option>
											<option value="admin">Admin</option>
										</Field>
										<p className="eg-text">
											{" "}
											<span className="required">*</span> Example: User
										</p>
										<ErrorMessage name="residenceType" render={renderError} />
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
