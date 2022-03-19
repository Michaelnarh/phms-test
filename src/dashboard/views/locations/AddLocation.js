import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
export default function Addlocation(props) {
	const [zones, setZones] = useState([]);
	useEffect(() => {
		const fetchZones = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		fetchZones();
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Residence is Required"),
		zone: Yup.string().nullable(),
	});

	const initialValues = {
		name: "",
		zone: "",
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/v1/locations`,
			headers: {
				"Content-Type": "application/json",
			},
			data: values,
		});
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
				{({ values, setFieldValue }) => (
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
									<span className="required">*</span> Example: Bomso
								</p>
								<ErrorMessage name="name" render={renderError} />
							</div>

							<div className="col-md-6 col-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="location"
								>
									<option>Select Zone</option>
									{zones &&
										zones.map((item) => (
											<option key={item._id} value={item._id}>
												{item.name}
											</option>
										))}
								</Field>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: Ayeduase-North
								</p>
								<ErrorMessage name="location" render={renderError} />
							</div>
						</div>
						<div className="mt-3">
							<button type="submit" className="btn is-primary">
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
