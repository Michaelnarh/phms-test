import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AuthService } from "../../../services/AuthService";
import helpDesk from "../../images/office.svg";
import logo from "../../images/logo-knust.png";
import { renderError } from "../../utils/ModuleFunctions";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

function Login(props) {
	const authService = new AuthService();

	const [isLoading, setIsLoading] = useState(false);
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			.min(6, "character too short, should be 6 and above")
			.required("Password  is Required"),
	});

	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values) => {
		setIsLoading(true);
		try {
			const res = await authService.Login(values);
			if (res.data.status === "success") {
				toast("Successfully Login");
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
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
							<ToastContainer />
							<div className="center-center-login">
								<div className="row">
									<div className="col-md-5 login-logo-area">
										<div className="d-flex">
											<img className="img-fluid" src={logo} alt="knust-logo" />
											<h3 className="text-caption">
												KNUST PRIVATE RESIDENCE MANAGEMENT SYSTEM
											</h3>
										</div>
										<img
											src={helpDesk}
											// width={150}
											className="img-fluid"
											alt="...."
										/>
									</div>
									<div className="col-md-7 login-area">
										<h3 className="text-center"> Admin LogIn</h3>

										<div className="">
											<div className="ro">
												<div className=" col-md-6 col-sm-12 mx-auto">
													<p className="text-center text-mutted">
														You are welcome to the KNUST Private Residence, The
														admininstration section Login.
													</p>
													<Field
														type="email"
														className="form-control input-transparent"
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
												<div className=" mx-auto col-md-6 col-sm-12">
													<Field
														type="password"
														className="form-control input-transparent"
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
												<div className="col-md-6 col-sm-12 mx-auto">
													{isLoading && <div id="dash-loading" />}
													{!isLoading && (
														<button
															type="submit"
															className="btn form-control text-center mt-3"
														>
															Submit
														</button>
													)}
												</div>
											</div>
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
