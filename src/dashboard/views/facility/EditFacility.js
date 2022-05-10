import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { renderError } from "../../utils/ModuleFunctions";
import AxiosInstance from "../../utils/AxiosInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";
export default function AddFacility(props) {
	const [facility, setFacility] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	useEffect(() => {
		setIsLoading(true);
		const fetchFacility = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/facilities/${id}`,
			});
			setFacility(res.data.data);
			setIsLoading(false);
		};

		const timer = setTimeout(() => fetchFacility(), 2000);

		return () => clearTimeout(timer);
	}, [id]);
	const validationSchema = Yup.object({
		name: Yup.string().required("Facility Name is Required"),
		description: Yup.string().nullable(),
	});

	const initialValues = {
		name: facility && (facility.name ?? ""),
		description: facility && (facility.description ?? ""),
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await AxiosInstance({
			method: "patch",
			url: `/api/v1/facilities/${id}`,
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
			{isLoading ? (
				<CustomSpinner type="circle" />
			) : (
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
			)}
		</>
	);
}
