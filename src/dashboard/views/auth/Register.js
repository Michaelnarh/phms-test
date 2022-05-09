import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { renderError } from "../../utils/ModuleFunctions";
import { AuthService } from "../../../services/AuthService";

export default function Register(props) {
	const [error, setError] = useState("");
	const authService = new AuthService();
	const validationSchema = Yup.object({
		username: Yup.string().required("Email is Required"),
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			.min(6, "character too short, should be 6 and above")
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
		alert(JSON.stringify(process.env.REACT_APP_API_URL));
		try {
			await authService.signUp(values);
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
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
							<h3> Add A User</h3>
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
