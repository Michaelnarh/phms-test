import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import AxiosInstance from "../../utils/AxiosInstance";
import { renderError } from "../../utils/ModuleFunctions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
export default function Addlocation(props) {
	const [zones, setZones] = useState([]);
	const [location, setLocation] = useState();
	const { id } = useParams();
	useEffect(() => {
		const fetchZones = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/zones`,
			});
			setZones(res.data.data);
		};
		const fetchLocation = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/locations/${id}`,
			});
			setLocation(res.data.data);
		};
		if (zones.length === 0) {
			fetchZones();
		}
		!location && fetchLocation();
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Location Name is Required"),
		zone: Yup.string().nullable(),
	});

	const initialValues = {
		name: location && (location.name ?? ""),
		zone: location && (location.zone ? location.zone._id : ""),
	};
	const onSubmit = async (values) => {
		console.log(values);

		const res = await AxiosInstance({
			method: "patch",
			url: `/api/v1/locations/${id}`,
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
								name="zone"
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
			</Formik>
		</>
	);
}
