import React, { useState, useCallback, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { renderError } from "../../utils/ModuleFunctions";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function EditZone(props) {
	const [tutors, setTutors] = useState([]);
	const [zone, setZone] = useState();
	const { id } = useParams();
	useEffect(() => {
		const fetchTutors = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/senior-tutors`,
			});
			setTutors(res.data.data);
		};
		const fetchZone = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones/${id}`,
			});
			setZone(res.data.data);
		};
		if (tutors.length === 0) fetchTutors();
		!zone && fetchZone();
	});

	const validationSchema = Yup.object({
		name: Yup.string().required("Zone Name is Required"),
		tutor: Yup.string().required("Tutor Name is Required"),
	});
	const initialValues = {
		name: zone && (zone.name ?? ""),
		// tutor: "",
		tutor: zone && (zone.tutor ? zone.tutor._id : ""),
	};

	const onSubmit = async (values) => {
		try {
			const res = await axios({
				method: "patch",
				url: `${process.env.REACT_APP_API_URL}/api/v1/zones/${id}`,
				headers: {
					accept: "application/json",
				},
				data: values,
			});
			console.log(res);
		} catch (err) {
			console.log(err);
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
