import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import { useDropzone } from "react-dropzone";
import Thumb from "../../utils/Thumb";
import AxiosInstance from "../../utils/AxiosInstance";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";

export default function EditResidence(props) {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [coverImage, setCoverImage] = useState();
	const [accepted, setAccepted] = useState([]);
	const [locations, setLocations] = useState([]);
	const [RClass, setRClass] = useState([]);
	const [residence, setResidence] = useState();
	const [facilityArr, setFacilityArr] = useState([]);
	const [facilityChecked, setFacilityChecked] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		setAccepted(acceptedFiles);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		const fetchResidence = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/residences/${slug}`,
			});
			setResidence(res.data.data);
			setFacilityChecked(res.data.facilities);
			setIsLoading(false);
		};
		const fetchLocations = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/locations`,
			});
			setLocations(res.data.data);
		};
		const fetchFacilities = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `api/v1/facilities`,
			});
			setFacilityArr(res.data.data);
		};
		const fetchRClass = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/classes`,
			});
			setRClass(res.data.data);
		};

		// if (locations.length === 0) {
		fetchLocations();
		// }
		// if (facilityArr.length === 0) {
		fetchFacilities();
		// }
		// if (facilityArr.length === 0) {
		fetchRClass();
		// }
		// !residence && fetchResidence();
		const timer = setTimeout(() => fetchResidence(), 2000);

		return () => clearTimeout(timer);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	console.log(residence && residence);
	const initialValues = {
		name: residence && (residence.name ?? ""),
		residenceType: residence && (residence?.residenceType ?? ""),
		location: residence && (residence?.location?._id ?? ""),
		lng: residence && (residence?.gpsAddress?.coordinates[0] ?? ""),
		lat: residence && (residence?.gpsAddress?.coordinates[1] ?? ""),
		digitalAddress: residence && (residence?.digitalAddress ?? ""),
		bookingLink: residence && (residence?.bookingLink ?? ""),
		managersName: residence && (residence?.managersName ?? ""),
		managersContact: residence && (residence?.managersContact ?? ""),
		portersName: residence && (residence?.portersName ?? ""),
		portersContact: residence && (residence?.portersContact ?? ""),
		ownersName: residence && (residence?.ownersName ?? ""),
		ownersContact: residence && (residence?.ownersContact ?? ""),
		rClass: residence && (residence?.rClass ?? ""),
		roomsTotal: residence && (residence?.roomsTotal ?? ""),
		totalBedspaces: residence && (residence?.totalBedspaces ?? ""),
		maleCapacity: residence && (residence?.maleCapacity ?? ""),
		femaleCapacity: residence && (residence?.femaleCapacity ?? ""),
		description: residence && (residence?.description ?? ""),

		images: [],
		facilities: [
			{
				id: "",
				num: "",
			},
		],
		coverImage: "",
	};

	const handleCoverUpload = (e) => {
		setCoverImage(e.currentTarget.files[0]);
	};

	const handleSubmit = async (values, resetForm) => {
		let formData = new FormData();
		// values.coordinates[1] = values.lat; //insert latitude data
		// values.coordinates[0] = values.lng; //insert longitude data
		const facilities_str = JSON.stringify(values.facilities);

		formData.append("name", values.name);
		formData.append("residenceType", values.residenceType);
		formData.append("location", values.location);
		formData.append("digitalAddress", values.digitalAddress);
		formData.append("bookingLink", values.bookingLink);
		formData.append("description", values.description);

		formData.append("managersName", values.managersName);
		formData.append("managersContact", values.managersContact);
		formData.append("portersName", values.portersName);
		formData.append("portersContact", values.portersContact);
		formData.append("ownersName", values.ownersName);
		formData.append("ownersContact", values.ownersContact);

		formData.append("roomsTotal", values.roomsTotal);
		formData.append("totalBedspaces", values.totalBedspaces);
		formData.append("maleCapacity", values.maleCapacity);
		formData.append("femaleCapacity", values.femaleCapacity);
		formData.append("facilities", facilities_str);
		formData.append("rClass", values.rClass);
		formData.append("lng", values.lng);
		formData.append("lat", values.lat);
		if (coverImage !== "" || coverImage !== null || coverImage !== undefined) {
			formData.append("coverImage", coverImage);
		}
		accepted.forEach((el) => {
			formData.append("images", el);
		});

		try {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/residences/${residence?._id}`,
				headers: {
					accept: "application/json",
				},
				data: formData,
			});

			console.log(res.data);
			resetForm();
			setAccepted([]);
			values.coverImage = "";
			navigate("/admin/residences");
		} catch (err) {
			console.log(err);
		}
	};
	console.log(facilityChecked);
	return (
		<>
			{isLoading ? (
				<CustomSpinner type="hash" />
			) : (
				<div className="container">
					<FormStepper
						initialValues={initialValues}
						onSubmit={async (values, resetForm) => {
							await handleSubmit(values, resetForm);
						}}
					>
						<FormikStep
							validationSchema={Yup.object({
								name: Yup.string("must be a string")
									.min(5, "Name is too short must be 5 characters and above")
									.required("Residence is Required"),
								residenceType: Yup.string()
									.min(2, "Required")
									.required("Residence Type is required"),
								location: Yup.string()
									.min(2, "Required Field")
									.required("Location is Required"),
								digitalAddress: Yup.string().nullable(),
								bookingLink: Yup.string()
									.matches(
										/((http?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
										"Please Enter a correct url!"
									)
									.nullable(),
							})}
						>
							<div className="row">
								<div className="col-md-4 col-sm-12">
									<label>
										<b>Residence Name</b>
									</label>
									<Field
										type="text"
										className="form-control"
										// placeholder=" Residence Name"
										name="name"
									/>
									<p className="eg-text">
										<span className="required">*</span> Example: Nana Adoma
									</p>
									<ErrorMessage name="name" render={renderError} />
								</div>
								<div className="col-md-4 col-sm-12 ">
									<label>
										<b>Type of Residence</b>
									</label>
									<Field
										as="select"
										name="residenceType"
										className="form-select"
										aria-label="Default select example"
									>
										{/* <option vallue="">Select Residence Type</option> */}
										<option value="Hostel">Hostel</option>
										<option value="Homestel">Homestel</option>
										<option value="Other">Other</option>
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: HOSTEL
									</p>
									<ErrorMessage name="residenceType" render={renderError} />
								</div>
								<div className="col-md-4 col-sm-12">
									<label>
										<b>Residence Location</b>
									</label>
									<Field
										as="select"
										className="form-select"
										// placeholder="Location"
										name="location"
									>
										{/* <option> select location</option> */}
										{locations &&
											locations.map((item) => (
												<option key={item._id} value={item._id}>
													{item.name}
												</option>
											))}
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Ayeduase
									</p>
									<ErrorMessage name="location" render={renderError} />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-4 col-sm-12">
									<label>
										<b>GhanaPost GPS Address</b>
									</label>
									<Field
										type="text"
										name="digitalAddress"
										className="form-control"
										// placeholder="GA-2324-3423"
										aria-label="digitalAddress"
									/>
									<p className="eg-text">
										Example: AK-1310-3223, use GhanaPost
									</p>
									<ErrorMessage name="digitalAddress" render={renderError} />
								</div>
								<div className="col-md-4 col-sm-12">
									<label>
										<b>Latitude and Longitude</b>
									</label>
									<Field
										type="number"
										className="form-control"
										placeholder="+/-90 Latitude"
										// value={lat}
										// onChange={(e) => setlt(e.target.value)}
										name="lat"
									/>
									<ErrorMessage name="lat" render={renderError} />
									<Field
										type="number"
										className="form-control"
										placeholder="+/-180 longitude"
										// value={lng}
										name="lng"
										// onChange={(e) => setlg(e.target.value)}
									/>
									<ErrorMessage name="lng" render={renderError} />
								</div>
								<div className="col-md-4 col-sm-12">
									<label>
										<b>Booking Link URL</b>
									</label>
									<Field
										type="url"
										className="form-control"
										placeholder="Booking Link"
										aria-label="booklink"
										name="bookingLink"
									/>
									<p className="eg-text">
										Eg: www.saintpeters.studentroombook.com
									</p>
									<ErrorMessage name="bookingLink" render={renderError} />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-8 col-sm-12">
									<Field
										type="text"
										as="textarea"
										name="description"
										className="form-control"
										placeholder="Short description of the Residence"
									/>
								</div>
							</div>
							<hr className="my-3" />
						</FormikStep>
						<FormikStep
							validationSchema={Yup.object({
								ownersName: Yup.string("Must be a String")
									.min(5, "Should be 5 letters and above")
									.nullable(),
								ownersContact: Yup.string("Must be a String")
									.min(10, "Should be telephone number")
									.nullable(),
								managersName: Yup.string("Must be a String")
									.min(5, "Should be 5 letters and above")
									.nullable(),
								managersContact: Yup.string("Must be a String")
									.min(10, "Should be telephone number")
									.nullable(),
								portersName: Yup.string("Must be a String")
									.min(5, "Should be 5 letters and above")
									.nullable(),
								portersContact: Yup.string("Must be a String")
									.min(10, "Should be telephone number")
									.nullable(),
							})}
						>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									<label>
										<b>Owner's Name</b>
									</label>
									<Field
										type="text"
										className="form-control"
										// placeholder="Owner's Name"
										name="ownersName"
									/>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Kate Williams
									</p>
									<ErrorMessage name="ownersName" render={renderError} />
								</div>
								<div className="col-md-6 col-sm-12">
									<label>
										<b>Owners' Contact</b>
									</label>
									<Field
										type="tel"
										name="ownersContact"
										className="form-control"
										// placeholder="Owner's Contact"
										aria-label="ownersContact"
									/>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: 0201658894
									</p>
									<ErrorMessage name="ownersContact" render={renderError} />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									<label>
										<b>Manger's Name</b>
									</label>
									<Field
										type="text"
										className="form-control"
										// placeholder="Manager's Name"
										name="managersName"
									/>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Noble Akoh
									</p>
									<ErrorMessage name="managersName" render={renderError} />
								</div>
								<div className="col-md-6 col-sm-12">
									<label>
										<b>Manager's Contact</b>
									</label>
									<Field
										type="tel"
										className="form-control"
										// placeholder="Manger's Contact"
										aria-label="managersContact"
										name="managersContact"
									/>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Eg:
										0201289778/0552311893
									</p>
									<ErrorMessage name="managersContact" render={renderError} />
								</div>
								<div className="row mt-3">
									<div className="col-md-6 col-sm-12">
										<label>
											<b>Porter's Name</b>
										</label>
										<Field
											type="text"
											className="form-control"
											// placeholder="Porter's Name"
											name="portersName"
										/>
										<p className="eg-text">
											{" "}
											<span className="required">*</span> Example: Francis Dogbe
										</p>
										<ErrorMessage name="portersName" render={renderError} />
									</div>
									<div className="col-md-6 col-sm-12">
										<label>
											<b>Porter's Contact</b>
										</label>
										<Field
											type="tel"
											name="portersContact"
											className="form-control"
											// placeholder="Porter's Contact"
											aria-label="portersContact"
										/>
										<p className="eg-text">
											{" "}
											<span className="required">*</span> Example: 0201658894
										</p>
										<ErrorMessage name="portersContact" render={renderError} />
									</div>
								</div>
								<hr className="my-3" />
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
									{facilityChecked.length > 0 &&
										facilityChecked.map((el) => (
											<div key={el._id} className="row">
												<div className="col-md-8">{el?.facility?.name}</div>
												<div className="col-md-4">{el?.count}</div>
											</div>
										))}
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

								<div className="col-md-6 col-sm-12 ">
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

						<FormikStep>
							<div>
								<div className="row mt-3">
									<div className="col-md-6 col-sm-12">
										{residence?.coverImage ? (
											<img
												src={`${process.env.REACT_APP_API_URL}/images/${residence.slug}/${residence.coverImage}`}
												alt={"..."}
												width={150}
												height={90}
											/>
										) : (
											<p>No Cover Image</p>
										)}
									</div>
									<div className="col-md-6 col-sm-12">
										<label>upload a Cover image</label>
										<input
											type="file"
											className="form-control"
											onChange={(e) => handleCoverUpload(e)}
										/>
										<ErrorMessage name="coverImage" render={renderError} />
									</div>
								</div>

								<div className="mx-5 mt-3 mb-2">
									{
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											{isDragActive ? (
												<p> drop of files </p>
											) : (
												<p className=" p-2">Click to Load images here</p>
											)}
										</div>
									}
									{accepted &&
										accepted.map((file, i) => {
											return <Thumb key={i} file={file} />;
										})}
								</div>
							</div>
						</FormikStep>
						{/* )} */}
					</FormStepper>
				</div>
			)}
		</>
	);
}

export function FormikStep({ children }) {
	return <>{children}</>;
}

export function FormStepper({ children, ...props }) {
	const childrenArray = React.Children.toArray(children);
	const [step, setStep] = useState(0);
	const [isSubmitting, setSubmit] = useState(false);
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
				{currentChild}

				{step > 0 ? (
					<button
						type="button"
						style={{ marginRight: 12 }}
						onClick={() => setStep((s) => s - 1)}
						className="btn px-3 py-2"
					>
						Back
					</button>
				) : (
					""
				)}
				<button type="submit" className="btn  py-2 px-3">
					{isLastPage() ? "Submit" : "Next"}
				</button>
			</Form>
		</Formik>
	);
}
