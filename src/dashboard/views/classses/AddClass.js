import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
export default function AddClass(props) {
	const validationSchema = Yup.object({
		name: Yup.string().required("Residence Class Name is Required"),
		description: Yup.string().nullable(),
		priceRange: Yup.string().nullable(),
	});

	const initialValues = {
		name: "",
		description: "",
		priceRange: "",
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/v1/classes`,
			headers: {
				"Content-Type": "application/json",
			},
			data: values,
		});
		if (res.data.status === "success") {
			window.location.assign("/admin/classes");
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
								<span className="required">*</span> Example: Class A
							</p>
							<ErrorMessage name="name" render={renderError} />
						</div>
						<div className="col-md-6 col-sm-12">
							<Field
								type="text"
								as="textarea"
								name="description"
								className="form-control"
								placeholder="Short description of the Residence Class"
							/>
							<ErrorMessage name="description" render={renderError} />
						</div>
					</div>

					<div className="row">
						<div className="col-md-6 col-sm-12">
							<Field
								type="text"
								name="priceRange"
								className="form-control"
								placeholder="Residence Price Range"
							/>
							<p className="eg-text">
								{" "}
								<span className="required">*</span> Example: 2500-3000
							</p>
							<ErrorMessage name="priceRange" render={renderError} />
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
