import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AuthService } from "../../../services/AuthService";
import { renderError } from "../../utils/ModuleFunctions";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

function Login(props) {
	const authService = new AuthService();

	const [error, setError] = useState("");
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			.min(6, "character too short, should be 6 and above")
			.required("password  is Required"),
	});

	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values) => {
		try {
			await authService.Login(values);
			toast("Successfully Login");
		} catch (err) {
			setError(err.message);
			toast.error(err.message, {
				position: "top-center",
			});
		}
	};

	return (
		<>
			<div
				style={{
					backgroundCcolor: "blue",
					height: "100vh",
					minHeight: "100vh",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			>
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
						<div className="container">
							<div className="center-center-login">
								<h3> Admin LogIn</h3>
								<div className="container">
									<div className="ro">
										{/* {setTimeout(() => { */}
										{/* <p className="text-danger text-center p-2">{error}</p> */}
										{/* }, 4000)} */}
										<ToastContainer />
										<div className=" col-md-4 col-sm-12 mx-auto">
											<Field
												type="email"
												className="form-control"
												placeholder="email"
												name="email"
												autoComplete="true"
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
												autoComplete="true"
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
			</div>
		</>
	);
}

export default Login;
