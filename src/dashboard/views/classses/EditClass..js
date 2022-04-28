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
		category: Yup.object({
			oneInOne: Yup.string().required("An amount is required"),
			twoInOne: Yup.string().required("An amount is required"),
			threeInOne: Yup.string().required("An amount is required"),
			fourInOne: Yup.string().required("An amount is required"),
		}),
	});

	const initialValues = {
		name: RClass && (RClass.name ?? ""),
		description: RClass && (RClass.description ?? ""),
		category: {
			oneInOne: RClass && (RClass?.category?.oneInOne ?? ""),
			twoInOne: RClass && (RClass?.category?.twoInOne ?? ""),
			threeInOne: RClass && (RClass?.category?.threeInOne ?? ""),
			fourInOne: RClass && (RClass?.category?.fourInOne ?? ""),
		},
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
