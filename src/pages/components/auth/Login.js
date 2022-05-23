import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renderError } from "../utils/ModuleFunctions";
import AxiosInstance from "../utils/AxiosBase";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

function LogInModal(props) {
	const { isLogin, setDrawer } = props;
	console.log(props);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const handleShow = () => {
		setShow(true);
		// setDrawer(false);
	};

	const validationSchema = Yup.object({
		username: Yup.string().required("Username is Required"),
		referenceNumber: Yup.number()
			.min(7, "Must be 8 Digits")
			.required("Reference Number is Required"),
		password: Yup.string()
			.min(2, "character too short, should be 5 and above")
			.required("Password is Required"),
	});

	const initialValues = {
		username: "",
		password: "",
		referenceNumber: "",
	};
	const handleSubmit = async (values) => {
		const res = await AxiosInstance({
			method: "post",
			// post to the uits students portal
			// url: `${process.env.REACT_APP_API_URL}/api/v1/academic-year`,
			headers: {
				"Content-Type": "application/json",
			},
			data: values,
		});
		if (res.data?.status === "success") {
			handleClose();
			toast.success("Login successful");
		}
		if (res.data?.status === "fail" || res.data?.status === "error") {
			toast.error(res?.data?.response?.error?.message);
		}
	};
	return (
		<>
			<Button
				style={{ borderColor: "#fff", borderSize: "1px", marginBottom: "8px" }}
				onClick={() => handleShow()}
				variant=""
			>
				Login
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				keyboard={false}
				className="margin-top"
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
						<Modal.Header closeButton>
							<Modal.Title>Login</Modal.Title>
							<ToastContainer />
						</Modal.Header>
						<Modal.Body>
							<div className="">
								<div className=" col-md-8 col-sm-12 mx-auto">
									<label>
										<b>Username</b>
										<span className="required">*</span>
									</label>
									<Field type="text" className="form-control" name="username" />
									<p className="eg-text">ssjames</p>
									<ErrorMessage name="username" render={renderError} />
								</div>
								<div className=" mx-auto mt-3 col-md-8 col-sm-12">
									<label>
										<b>Password</b>
										<span className="required">*</span>
									</label>
									<Field
										type="password"
										className="form-control"
										name="password"
									/>
									<ErrorMessage name="password" render={renderError} />
								</div>
								<div className=" mx-auto mt-3 col-md-8 col-sm-12">
									<label>
										<b>Reference Number</b>
										<span className="required">*</span>
									</label>
									<Field
										type="number"
										className="form-control"
										name="referenceNumber"
									/>
									<p className="eg-text">20522750</p>
									<ErrorMessage name="referenceNumber" render={renderError} />
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								type="button"
								onClick={() => handleClose()}
							>
								Close
							</Button>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Modal.Footer>
					</Form>
				</Formik>
			</Modal>
		</>
	);
}

export default LogInModal;
