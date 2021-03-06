import React from "react";
import * as Yup from "yup";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from "../../utils/AxiosInstance";
export default function AddFacility(props) {
	const validationSchema = Yup.object({
		name: Yup.string().required("Facility Name is Required"),
		description: Yup.string().nullable(),
	});

	const initialValues = {
		name: "",
		description: "",
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = AxiosInstance({
			method: "post",
			url: `/api/v1/facilities`,
			headers: {
				"Content-Type": "application/json",
			},
			data: values,
		});
		if (res.data.status === "success") {
			window.location.assign("/admin/facilities");
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
						<div className="col-md-6 col-sm-12">
							<Field
								type="text"
								className="form-control"
								placeholder="Name"
								name="name"
							/>
							<p className="eg-text">
								<span className="required">*</span> Example: CCTV Camera
							</p>
							<ErrorMessage name="name" render={renderError} />
						</div>
						<div className="col-md-6 col-sm-12">
							<Field
								type="text"
								as="textarea"
								name="description"
								className="form-control"
								placeholder="Short description of the Facility"
							/>
							<p className="eg-text">
								{" "}
								<span className="required">*</span> Example: check for good
								security
							</p>
							<ErrorMessage name="description" render={renderError} />
						</div>
					</div>

					<div className="mt-3">
						<button type="submit" className="btn is-primary">
							Submit
						</button>
					</div>
				</Form>
			</Formik>
		</>
	);
}
