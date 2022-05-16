import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

function AcademicYearModal() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error] = useState("");

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is Required"),
		years: Yup.string()
			.min(3, "character too short, should be 3 and above")
			.required("years  is Required"),
	});

	const initialValues = {
		name: "",
		years: "",
	};
	const handleSubmit = async (values, resetForm) => {
		console.log(values);
		try {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/academic-year`,
				headers: {
					"Content-Type": "application/json",
				},
				data: values,
			});
			resetForm();
			toast.success("Academic Year Added Successfully");
			handleClose();
			if (res.data?.status === "success") {
			}
		} catch (err) {
			if (err.response?.data?.message) {
				toast.error(err.response?.data?.message, { position: "top-center" });
				// handleClose();
			}
		}
	};
	return (
		<>
			<Button onClick={() => handleShow()} variant="success">
				Add Academic Year
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="top-margin"
			>
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						await handleSubmit(values, resetForm);
					}}
				>
					<Form>
						<Modal.Header closeButton>
							<Modal.Title>Add An Academic Year</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="">
								<ToastContainer className="top-margin" />
								<div className=" col-md-8 col-sm-12 mx-auto">
									<label>
										<b>Academic Year Name</b>
										<span className="required">*</span>
									</label>
									<Field type="text" className="form-control" name="name" />
									<p className="eg-text">2022/2023 Academic Year</p>
									<ErrorMessage name="name" render={renderError} />
								</div>
								<div className=" mx-auto mt-3 col-md-8 col-sm-12">
									<label>
										<b>Years</b>
										<span className="required">*</span>
									</label>
									<Field type="text" className="form-control" name="years" />
									<p className="eg-text">2022/2023</p>
									<ErrorMessage name="years" render={renderError} />
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

export default AcademicYearModal;
