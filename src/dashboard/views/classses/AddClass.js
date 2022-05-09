import React from "react";
import * as Yup from "yup";
import AxiosInstance from "../../utils/AxiosInstance";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
export default function AddClass(props) {
	const validationSchema = Yup.object({
		name: Yup.string().required("Residence Class Name is Required"),
		description: Yup.string().nullable(),
		category: Yup.object({
			oneInOne: Yup.string().required("An amount is required"),
			twoInOne: Yup.string().required("An amount is required"),
			threeInOne: Yup.string().required("An amount is required"),
			fourInOne: Yup.string().required("An amount is required"),
		}),
	});

	const initialValues = {
		name: "",
		description: "",
		category: {
			oneInOne: "",
			twoInOne: "",
			threeInOne: "",
			fourInOne: "",
		},
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await AxiosInstance({
			method: "post",
			url: `/api/v1/classes`,
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
							<label>
								<b>Class Name</b>
							</label>
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
							<label>
								<b>Class Description</b>
							</label>
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
							<label>
								<b>One In One Room</b>
								<span className="required">*</span>
							</label>
							<Field
								type="text"
								name="category.oneInOne"
								className="form-control"
							/>
							<p className="eg-text"> Example: 2500-3000</p>
							<ErrorMessage name="category.oneInOne" render={renderError} />
						</div>
						<div className="col-md-6 col-sm-12">
							<label>
								<b>Two In One Room </b>
								<span className="required">*</span>
							</label>
							<Field
								type="text"
								name="category.twoInOne"
								className="form-control"
							/>
							<p className="eg-text"> Example: 2500-3000</p>
							<ErrorMessage name="category.twoInOne" render={renderError} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 col-sm-12">
							<label>
								<b>Three In One Room</b>
								<span className="required">*</span>
							</label>
							<Field
								type="text"
								name="category.threeInOne"
								className="form-control"
							/>
							<p className="eg-text"> Example: 2500-3000</p>
							<ErrorMessage name="category.threeInOne" render={renderError} />
						</div>
						<div className="col-md-6 col-sm-12">
							<label>
								<b>Four In One Room</b>
								<span className="required">*</span>
							</label>
							<Field
								type="text"
								name="category.fourInOne"
								className="form-control"
							/>
							<p className="eg-text"> Example: 2500-3000</p>
							<ErrorMessage name="category.fourInOne" render={renderError} />
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
