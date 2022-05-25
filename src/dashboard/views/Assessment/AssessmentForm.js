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
									<h3>Facilities</h3>
									<p>Room Type</p>
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"6"} />

										<b className="mx-2">Self-Contained</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"4"} />
										<b className="mx-2">
											Combination of Self-Contained and Shared
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"2"} />
										<b className="mx-2">Shared lavatory for 2 or 3 rooms</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="proximity" value={"1"} />
										<b className="mx-2">
											Shared lavatory for more than 3 rooms
										</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm- my-3">
								<div role="group" aria-labelledby="accessibility-radio-group">
									<p>Accessibility</p>
									<label className="label-spacing">
										<Field type="checkbox" name="accessibilty" value={"8"} />
										<b className="mx-2">
											Room furnishing: Does the room have fan, bed with
											mattress, tables, chairs?
										</b>
									</label>
									<br />
									<label>
										<Field type="checkbox" name="accessibilty" value={"5"} />
										<b className="mx-2">
											Study Room: Does the hostel have a study room ?
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="checkbox" name="accessibilty" value={"3"} />
										<b className="mx-2">
											TV/Common room: Does the hostel have a TV/Common room ?
										</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm-12 mt-4">
								<div role="group" aria-labelledby="area-radio-group">
									<p>Security</p>
									<label className="label-spacing">
										<Field type="checkbox" name="area" value={"9"} />
										<b className="mx-2">
											Presence of functioning CCTV cameras?
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="checkbox" name="area" value={"7"} />
										<b className="mx-2">Presence of electric fencing?</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="checkbox" name="area" value={"5"} />
										<b className="mx-2">Is the hostel/homestel walled?</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="checkbox" name="area" value={"3"} />
										<b className="mx-2">Is the hostel/homestel gated?</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm-12 mt-4">
								<div role="group" aria-labelledby="area-radio-group">
									<p>Kitchen Type</p>
									<label className="label-spacing">
										<Field type="radio" name="area" value={"9"} />
										<b className="mx-2">Room-specific kitchen</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"7"} />
										<b className="mx-2">Shared kitchen</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">No Kitchen</b>
									</label>
									<br />
								</div>
							</div>
						</div>
					</FormikStep>
					<FormikStep>
						<div className="row">
							<div className="col-md-6 col-sm-12 mt-4">
								<div role="group" aria-labelledby="area-radio-group">
									<p>UTILITIES</p>
									<label className="label-spacing">
										<Field type="checkbox" name="area" value={"9"} />
										<b className="mx-2">
											Is there an alternative source of power?
										</b>
									</label>
									<br />
									<p>Type of Meter</p>
									<label className="label-spacing">
										<Field type="radio" name="area" value={"7"} />
										<b className="mx-2">Room-specific</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">Shared</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<p>WATER SUPPLY</p>
								<p>Source of Water</p>

								<label className="label-spacing">
									<Field type="radio" name="area" value={"7"} />
									<b className="mx-2">
										Mechanized borehole available with machine pump and
										reserviour
									</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">
										Manual borehole available without machine pump and
										reserviour
									</b>
								</label>
								<br />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<p>Reliability of Water</p>
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Very reliable supply</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Somehow reliable</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Erratic/unreliable water supply</b>
								</label>
								<br />
							</div>
							<div className="col-md-6 col-sm-12">
								<p>Payment of Electricity</p>
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Fully by hostel</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Shared between hostel and tenants</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Fully by tenants</b>
								</label>
								<br />
							</div>
						</div>
					</FormikStep>
					<FormikStep>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<p>porters</p>
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Day and Night</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Day only</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Night only</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">No Porter</b>
								</label>
								<br />
							</div>
							<div className="col-md-6 col-sm-12">
								<p>Security Personnel</p>
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Day and Night</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Day only</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Night only</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">No Security Personnel</b>
								</label>
								<br />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<p>Manager(s)</p>
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Manager not owner ?</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Manager same as owner</b>
								</label>
								<br />
								<label className="label-spacing">
									<Field type="radio" name="area" value={"5"} />
									<b className="mx-2">Manager is same as managerAsPorter</b>
								</label>
								<br />
							</div>
						</div>
						<div className="col-md-6 col-sm-12">
							<p>Cleaners</p>
							<label className="label-spacing">
								<Field type="radio" name="area" value={"5"} />
								<b className="mx-2">
									Satisfactory cleaning for only common places (compound,
									corridors etc) ?
								</b>
							</label>
							<br />
							<label className="label-spacing">
								<Field type="radio" name="area" value={"5"} />
								<b className="mx-2">
									Satisfactory for cleaning both common places (compound,
									corridors etc.) and rooms ?
								</b>
							</label>
							<br />
						</div>
					</FormikStep>
					<FormikStep>
						<h5>Extra Services</h5>
						<p>Paid TV Channel</p>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div role="group" aria-labelledby="paid-tv-channel-group">
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">
											DSTV Available to rooms and common TV rooms ?
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">
											DSTV available only at common TV Rooms
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">
											Other service providers available to rooms and common TV
											rooms?
										</b>
									</label>
									<br />
									<label className="label-spacing">
										<Field type="radio" name="area" value={"5"} />
										<b className="mx-2">No paid TV Channels</b>
									</label>
									<br />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div role="group" aria-labelledby="specific-tv-radio-group">
									<p>Is there an air-conditioner in the room?</p>
									<div className="d-flex">
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">Yes</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">No</b>
										</label>
										<br />
									</div>
								</div>
								<div className="col-md-6 col-sm-12">
									<h5>Air Conditioner</h5>
									<div role="group" aria-labelledby="specific-tv-radio-group">
										<p>Is there an air-conditioner in the room?</p>
										<div className="d-flex">
											<label className="label-spacing">
												<Field type="radio" name="specificTV" value={"5"} />
												<b className="mx-2">Yes</b>
											</label>
											<br />
											<label className="label-spacing">
												<Field type="radio" name="specificTV" value={"5"} />
												<b className="mx-2">No</b>
											</label>
											<br />
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<h5>Fridges</h5>
								<div role="group" aria-labelledby="specific-tv-radio-group">
									<p>Does your room have a fridge provided by the hostel?</p>
									<div className="d-flex">
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">Yes</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">No</b>
										</label>
										<br />
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div role="group" aria-labelledby="specific-tv-radio-group">
									<p>Provision of Gas</p>
									<div className="d-flex">
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">Common Kitchen with Gas Cylinders</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">Room Kitchen with Gas Cylinders</b>
										</label>
										<br />
									</div>
								</div>
								<div role="group" aria-labelledby="specific-tv-radio-group">
									<p>Supply of Gas to common Kitchens</p>
									<div className="d-flex">
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">Yes</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">No</b>
										</label>
										<br />
									</div>
								</div>
								<div role="group" aria-labelledby="specific-tv-radio-group">
									<p>Supply of cooking stoves</p>
									<div className="d-flex">
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">
												Each room has a cooking stove (electric or gas)
											</b>
										</label>
										<br />
										<label className="label-spacing">
											<Field type="radio" name="specificTV" value={"5"} />
											<b className="mx-2">
												Common Kitchens with Cooking Stoves (electric or gas)
											</b>
										</label>
										<br />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-6 col-sm-12">
									<div role="group" aria-labelledby="specific-tv-radio-group">
										<p>Is there a functioning water heater in your bathroom?</p>
										<div className="d-flex">
											<label className="label-spacing">
												<Field type="radio" name="specificTV" value={"2"} />
												<b className="mx-2">Yes</b>
											</label>
											<br />
											<label className="label-spacing">
												<Field type="radio" name="specificTV" value={"0"} />
												<b className="mx-2">No</b>
											</label>
											<br />
										</div>
									</div>
								</div>
							</div>
						</div>
					</FormikStep>
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
