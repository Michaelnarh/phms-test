import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AssessmentForm(props) {
	const navigate = useNavigate();
	const [RClass, setRClass] = useState([]);
	const [facilityArr] = useState([]);

	useEffect(() => {
		const fetchRClass = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/classes`,
			});
			setRClass(res.data.data);
		};
		fetchRClass();
		// }
	}, []);

	// const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
	// const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

	const initialValues = {
		name: "",
		proximity: 0,
		residenceType: "",
		location: "",
		lat: 0,
		lng: 0,
		digitalAddress: "",
		bookingLink: "",
		managersName: "",
		managersContact: "",
		portersName: "",
		portersContact: "",
		ownersName: "",
		ownersContact: "",
		facilities: [
			{
				id: "",
				num: "",
			},
		],
		rClass: "",
		images: [],
		coverImage: "",
		roomsTotal: "",
		totalBedspaces: "",
		maleCapacity: "",
		femaleCapacity: "",
	};

	const handleSubmit = async (values, resetForm) => {
		let formData = new FormData();
		// values.coordinates[1] = values.lat; //insert latitude data
		// values.coordinates[0] = values.lng; //insert longitude data

		formData.append("name", values.name);

		try {
			await AxiosInstance({
				method: "post",
				url: `/api/v1/residences`,
				headers: {
					accept: "application/json",
				},
				data: formData,
			});
			resetForm();
			navigate("/admin/residences");
		} catch (err) {
			console.log("logged Error", err?.response?.data?.message);
			if (err?.response.data?.message) {
				if (err?.response?.data?.message.startsWith("Can't extract")) {
					toast.error(
						"Please provide a correct coodinates for the Longitude and the Latitude",
						{ position: "top-center" }
					);
				} else {
					toast.error(err?.response?.data?.message, { position: "top-center" });
				}
			}
		}
	};

	return (
		<>
			<div className="container">
				<FormStepper
					initialValues={initialValues}
					onSubmit={async (values, resetForm) => {
						await handleSubmit(values, resetForm);
					}}
				>
					<FormikStep
					// validationSchema={Yup.object({
					// 	name: Yup.string("must be a string")
					// 		.min(5, "Name is too short must be 5 characters and above")
					// 		.required("Residence is Required"),
					// 	residenceType: Yup.string()
					// 		.min(2, "Required")
					// 		.required("Residence Type is required"),
					// 	location: Yup.string()
					// 		.min(2, "Required Field")
					// 		.required("Location is Required"),
					// 	digitalAddress: Yup.string().nullable(),
					// })}
					>
						<div className="assess-card">
							<ToastContainer />
							<h5>DETERMINANTS OF RESIDENCE CLASS AND PRICES</h5>
							<h6>LOCATION</h6>
							<div className="row">
								<div className="col-md-6 col-sm-12">
									<div role="group" aria-labelledby="proximity-radio-group">
										<p>Proximity</p>
										<label className="label-spacing">
											<Field type="radio" name="proximity" value={"10"} />

											<b className="mx-2">Very Near = Less than 1km</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="proximity" value={"8"} />
											<b className="mx-2">Near = Between 1 and 3km</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="proximity" value={"6"} />
											<b className="mx-2">Far = Between 3 and 5km</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="proximity" value={"4"} />
											<b className="mx-2">
												Very far = Greater than 5km with transportation
											</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="proximity" value={"2"} />
											<b className="mx-2">
												Very far = Greater than 5km without transportation
											</b>
										</label>
										<br />
									</div>
								</div>
								<div className="col-md-6 col-sm- my-3">
									<div role="group" aria-labelledby="accessibility-radio-group">
										<p>Accessibility</p>
										<label className="label-spacing">
											<Field type="radio" name="accessibilty" value={"8"} />
											<b className="mx-2">
												Very accessible (Very good road leads to the
												hostel/homestel)
											</b>
										</label>
										<br />
										<label>
											<Field type="radio" name="accessibilty" value={"5"} />
											<b className="mx-2">
												Accessible (possible to drive to hostel but on bad road)
											</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="accessibilty" value={"3"} />
											<b className="mx-2">
												Not accessible (Motorable road leads to hostel/homestel)
											</b>
										</label>
										<br />
									</div>
								</div>
								<div className="col-md-6 col-sm-12 mt-4">
									<div role="group" aria-labelledby="area-radio-group">
										<p>Area Proritization</p>
										<label className="label-spacing">
											<Field type="radio" name="area" value={"9"} />
											<b className="mx-2">Priority Area 1 (Ayeduase)</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="area" value={"7"} />
											<b className="mx-2">Priority Area 2 (Kotei)</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="area" value={"5"} />
											<b className="mx-2">
												Priority Area 3 (Ayeduase New Site)
											</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="area" value={"3"} />
											<b className="mx-2">Priority Area 4 (Bomso & Gaza)</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="area" value={"3"} />
											<b className="mx-2">
												Priority Area 5 (Kentinkrono, Emina, Twumduasi)
											</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="area" value={"1"} />
											<b className="mx-2">Priority Area 5 (Others)</b>
										</label>
									</div>
								</div>
							</div>
						</div>

						<hr className="my-3" />
					</FormikStep>
					<FormikStep
					// validationSchema={Yup.object({

					// })}
					>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div role="group" aria-labelledby="proximity-radio-group">
									<p>Proximity</p>
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"10"} />

										<b className="mx-2">Very Near = Less than 1km</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"8"} />
										<b className="mx-2">Near = Between 1 and 3km</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"6"} />
										<b className="mx-2">Far = Between 3 and 5km</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"4"} />
										<b className="mx-2">
											Very far = Greater than 5km with transportation
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"2"} />
										<b className="mx-2">
											Very far = Greater than 5km without transportation
										</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm- my-3">
								<div role="group" aria-labelledby="accessibility-radio-group">
									<p>Accessibility</p>
									<label className="label-spacing">
										<Field type="radio" name="accessibilty" value={"8"} />
										<b className="mx-2">
											Very accessible (Very good road leads to the
											hostel/homestel)
										</b>
									</label>
									<br />
									<label>
										<Field type="radio" name="accessibilty" value={"5"} />
										<b className="mx-2">
											Accessible (possible to drive to hostel but on bad road)
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="accessibilty" value={"3"} />
										<b className="mx-2">
											Not accessible (Motorable road leads to hostel/homestel)
										</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm-12 mt-4">
								<div role="group" aria-labelledby="area-radio-group">
									<p>Area Proritization</p>
									<label className="label-spacing">
										<Field type="radio" name="area" value={"9"} />
										<b className="mx-2">Priority Area 1 (Ayeduase)</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"7"} />
										<b className="mx-2">Priority Area 2 (Kotei)</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">Priority Area 3 (Ayeduase New Site)</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"3"} />
										<b className="mx-2">Priority Area 4 (Bomso & Gaza)</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"3"} />
										<b className="mx-2">
											Priority Area 5 (Kentinkrono, Emina, Twumduasi)
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"1"} />
										<b className="mx-2">Priority Area 5 (Others)</b>
									</label>
								</div>
							</div>
						</div>
					</FormikStep>
					<FormikStep
						validationSchema={Yup.object({
							totalBedspaces: Yup.number("must be a number").nullable(),
							roomsTotal: Yup.number("must be a number").nullable(),
							femaleCapacity: Yup.number("must be a number").nullable(),
							maleCapacity: Yup.number("must be a number").nullable(),
						})}
					>
						<div className="row">
							<ToastContainer />
							<div className="col-md-6 col-sm-12">
								<label>
									<b>Total Number of Rooms</b>
								</label>
								<Field
									type="number"
									name="roomsTotal"
									className="form-control"
									// placeholder="Total Number of Rooms"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 25
								</p>
								<ErrorMessage name="roomsTotal" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<label>
									<b>Total Number of Bed Spaces</b>
								</label>
								<Field
									type="number"
									name="totalBedspaces"
									className="form-control"
									// placeholder="Total Bed Spaces"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 100
								</p>
								<ErrorMessage name="totalBedspaces" render={renderError} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<label>
									<b>Males Capacity</b>
								</label>
								<Field
									type="number"
									className="form-control"
									// placeholder="Male Capacity"
									name="maleCapacity"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 60
								</p>
								<ErrorMessage name="maleCapacity" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<label>
									<b>Females Capacity</b>
								</label>
								<Field
									type="number"
									className="form-control"
									// placeholder="Femaile Capacity"
									name="femaleCapacity"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 40
								</p>
								<ErrorMessage name="femaleCapacity" render={renderError} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<FieldArray
									name="facilites"
									render={(arrayHelpers) => (
										<div>
											{facilityArr?.length > 0 &&
												facilityArr.map((name, i) => {
													return (
														<div key={i} className="row">
															<div className="col-md-6 col-sm-6 col-mb-3">
																<label>
																	<Field
																		name={`facilities[${i}].id`}
																		type="checkbox"
																		value={facilityArr[i]._id}
																	/>
																	<span style={{ marginLeft: 4 }}>
																		<b>{facilityArr[i].name}</b>
																	</span>
																</label>
															</div>
															<div className="col-md-3 col-sm-6 mb-3 ml-3">
																<Field
																	type="number"
																	className="form-control"
																	name={`facilities[${i}].num`}
																/>
															</div>
														</div>
													);
												})}
										</div>
									)}
								/>
							</div>

							<div className="col-md-6 col-sm-12 my-3 ">
								<label>
									<b>Type of Residence Class</b>
								</label>
								<Field
									as="select"
									name="rClass"
									className="form-select"
									aria-label="Default select example"
								>
									<option> Select Class </option>
									{RClass &&
										RClass.map((item) => (
											<option key={item._id} value={item._id}>
												{item.name}
											</option>
										))}
								</Field>

								<ErrorMessage name="rClass" render={renderError} />
							</div>
						</div>
					</FormikStep>

					<FormikStep></FormikStep>
					{/* )} */}
				</FormStepper>
			</div>
		</>
	);
}

export function FormikStep({ children }) {
	return <>{children}</>;
}

export function FormStepper({ children, ...props }) {
	const childrenArray = React.Children.toArray(children);
	const [step, setStep] = useState(0);
	// const [isSubmitting, setSubmit] = useState(false);
	// const [completed, setCompleted] = useState(false);
	const currentChild = childrenArray[step];

	function isLastPage() {
		return step === childrenArray.length - 1;
	}

	return (
		<Formik
			{...props}
			validationSchema={currentChild.props?.validationSchema}
			onSubmit={async (values, { resetForm }) => {
				if (isLastPage()) {
					props.onSubmit(values, resetForm);
				} else {
					setStep((s) => s + 1);
				}
			}}
		>
			<Form>
				<ToastContainer className="top-margin" />
				{currentChild}

				{step > 0 ? (
					<button
						type="button"
						style={{ marginRight: 12 }}
						onClick={() => setStep((s) => s - 1)}
						className="btn mb-5 px-3 py-2"
					>
						Back
					</button>
				) : (
					""
				)}
				<button type="submit" className="btn mb-5  py-2 px-3">
					{isLastPage() ? "Submit" : "Next"}
				</button>
			</Form>
		</Formik>
	);
}
