import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "../../utils/AxiosInstance";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export default function Addzone(props) {
	const [tutors, setTutors] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTutors = async () => {
			try {
				const res = await AxiosInstance({
					method: "get",
					url: `/api/v1/senior-tutors`,
				});
				setTutors(res.data.data);
			} catch (err) {
				if (err.response.data.message) {
					toast.error(err.response.data.message, { position: "top-center" });
				}
			}
		};
		fetchTutors();
	}, []);

	const validationSchema = Yup.object({
		name: Yup.string().required("Zone Name is Required"),
		tutor: Yup.string().required("Tutor Name is Required"),
	});
	const initialValues = {
		name: "",
		tutor: "",
	};

	const onSubmit = async (values) => {
		try {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/zones`,
				headers: {
					accept: "application/json",
				},
				data: values,
			});
			navigate("/admin/zones", {
				state: {
					message: `New Record of ${res.data?.newZone.name} added successfully`,
				},
			});
		} catch (err) {
			if (err.response.data.message) {
				toast.error(err.response.data.message, { position: "top-center" });
			}
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
				<Form>
					<div className="row">
						<ToastContainer className="top-margin" />
						<div className="col-md-6 col-sm-12">
							<Field
								type="text"
								className="form-control"
								placeholder=" Zone Name"
								name="name"
							/>
							<p className="eg-text">
								<span className="required">*</span> Example: Ayeduase-South
							</p>
							<ErrorMessage name="name" render={renderError} />
						</div>
						<div className="col-md-6 col-sm-12">
							<Field
								as="select"
								className="form-select"
								placeholder="Select Senior Tutor"
								name="tutor"
							>
								<option> Select Senior Tutor</option>
								{tutors &&
									tutors.map((item) => (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									))}
							</Field>
							<p className="eg-text">
								{" "}
								<span className="required">*</span> Example: Dr. Martin Owusu
								Ansah
							</p>
							<ErrorMessage name="location" render={renderError} />
						</div>
					</div>
					<button type="submit" className="btn is-primary">
						Submit
					</button>
				</Form>
			</Formik>
		</>
	);
}
