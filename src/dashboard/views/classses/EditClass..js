import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
export default function AddFacility(props) {
	const [RClass, setRClass] = useState();
	const { id } = useParams();
	useEffect(() => {
		const fetchFacility = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/classes/${id}`,
			});
			setRClass(res.data.data);
		};
		!RClass && fetchFacility();
	}, []);
	const validationSchema = Yup.object({
		name: Yup.string().required("Residnce Class  Name is Required"),
		description: Yup.string().nullable(),
		priceRange: Yup.string().nullable(),
	});

	const initialValues = {
		name: RClass && (RClass.name ?? ""),
		description: RClass && (RClass.description ?? ""),
		priceRange: RClass && (RClass.priceRange ?? ""),
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/v1/classes/${id}`,
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
								placeholder="Short description of the Class Specified"
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
