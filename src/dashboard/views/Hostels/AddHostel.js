import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renderError } from "../../utils/ModuleFunctions";
import { useDropzone } from "react-dropzone";
import Thumb from "../../utils/Thumb";
import * as Yup from "yup";
import axios from "axios";

export default function Addhostel(props) {
	const [coverImage] = useState("");
	const [accepted, setAccepted] = useState([]);
	const [locations, setLocations] = useState([]);
	const [facilities, setFacilities] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		setAccepted(acceptedFiles);
	}, []);

	useEffect(() => {
		const fetchLocations = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/locations`,
			});
			setLocations(res.data.data);
		};
		const fetchFacilities = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/facilities`,
			});
			setFacilities(res.data.data);
		};
		if (locations.length === 0) {
			fetchLocations();
		}
		// if (facilities.length === 0) {
		// 	fetchFacilities();
		// }
	});
	// const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const [lat, setlat] = useState(-11.121);
	const [lng, setlng] = useState(21.2122);

	// const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
	// const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

	const validationSchema = Yup.object({
		name: Yup.string().required("Residence Name is Required"),
		residenceType: Yup.string().required("Residence Type is required"),
		location: Yup.string().required("Location is Required"),
		digitalAddress: Yup.string().nullable(),
		managersName: Yup.string().nullable(),
		managersContact: Yup.string().nullable(),
		portersName: Yup.string().nullable(),
		portersContact: Yup.string().nullable(),
		ownersName: Yup.string().nullable(),
		ownersContact: Yup.string().nullable(),
		bookingLink: Yup.string()
			.matches(
				/((http?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
				"Please Enter a correct url!"
			)
			.nullable(),
	});

	const initialValues = {
		name: "",
		residenceType: "",
		location: "",
		gpsAddress: {
			coordinates: [parseFloat(lng), parseFloat(lat)],
		},
		digitalAddress: "",
		bookingLink: "",
		managersName: "",
		managersContact: "",
		portersName: "",
		portersContact: "",
		ownersName: "",
		ownersContact: "",
		facilities: [],
		registered: false,
		regDate: Date,
		images: [],
		coverImage: "",
		roomsTotal: null,
		totalBedspaces: null,
		maleCapacity: null,
		femaleCapacity: null,
	};

	const handleSubmit = async (values) => {
		console.log(values);
		let formData = new FormData();
		values.gpsAddress.coordinates[1] = lat; //insert latitude data
		values.gpsAddress.coordinates[0] = lng; //insert longitude data

		formData.append("name", values.name);
		formData.append("residenceType", values.residenceType);
		formData.append("location", values.location);
		formData.append("digitalAddress", values.digitalAddress);
		formData.append("bookingLink", values.bookingLink);
		formData.append("gpsAddress", values.gpsAddress);

		formData.append("managersName", values.managersName);
		formData.append("managersContact", values.managersContact);
		formData.append("portersName", values.portersName);
		formData.append("portersContact", values.portersContact);
		formData.append("ownersName", values.ownersName);
		formData.append("ownersContact", values.ownersContact);

		formData.append("facilities", values.facilities);
		formData.append("roomsTotal", values.roomsTotal);
		formData.append("totalBedspaces", values.totalBedspaces);
		formData.append("maleCapacity", values.maleCapacity);
		formData.append("femaleCapacity", values.femaleCapacity);

		formData.append("coverImage", values.coverImage);
		accepted.forEach((el) => {
			formData.append("images", el);
		});
		console.log(formData.entries());
		try {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences`,
				headers: {
					accept: "application/json",
				},
				data: formData,
			});
			setAccepted([]);
			values.coverImage = "";
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="container">
				<FormStepper
					validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={async (values, { resetForm }) => {
						await handleSubmit(values);
						resetForm();
					}}
				>
					<FormikStep
						validationSchema={Yup.object({
							name: Yup.string().required("Residence is Required"),
							residenceType: Yup.string().required(
								"Residence Type is required"
							),
							location: Yup.string().required("Location is Required"),
							digitalAddress: Yup.string().nullable(),
						})}
					>
						<div className="row">
							<div className="col-md-4 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder=" Residence Name"
									name="name"
								/>
								<p className="eg-text">
									<span className="required">*</span> Example: Nana Adoma
								</p>
								<ErrorMessage name="name" render={renderError} />
							</div>
							<div className="col-md-4 col-sm-12 ">
								<Field
									as="select"
									name="residenceType"
									className="form-select"
									aria-label="Default select example"
								>
									<option>Select Residence Type</option>
									<option value="Hostel">HOSTEL</option>
									<option value="Homestel">HOMESTEL</option>
									<option value="Other">Other</option>
								</Field>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: HOSTEL
								</p>
								<ErrorMessage name="residenceType" render={renderError} />
							</div>
							<div className="col-md-4 col-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="location"
								>
									<option> select location</option>
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
								<Field
									type="text"
									name="digitalAddress"
									className="form-control"
									placeholder="GA-2324-3423"
									aria-label="digitalAddress"
								/>
								<p className="eg-text">Example: AK-1310-3223, use GhanaPost</p>
								<ErrorMessage name="digitalAddress" render={renderError} />
							</div>
							<div className="col-md-4 col-sm-12">
								<Field
									type="number"
									className="form-control"
									placeholder="+/-90 Latitude"
									// value={alt}
									// onChange={(e) => setlt(e.target.value)}
									name="lat"
								/>
								<ErrorMessage name="alt" render={renderError} />
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
					<FormikStep>
						<div className="row mt-3">
							<div className="col-md-6 col-sm-12">
								<Field
									type="text"
									className="form-control"
									placeholder="Owner's Name"
									name="ownersName"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: Kate Williams
								</p>
								<ErrorMessage name="ownersName" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									type="tel"
									name="ownersContact"
									className="form-control"
									placeholder="Owner's Contact"
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
								<Field
									type="text"
									className="form-control"
									placeholder="Manager's Name"
									name="managersName"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: Noble Akoh
								</p>
								<ErrorMessage name="managersName" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									type="tel"
									className="form-control"
									placeholder="Manger's Contact"
									aria-label="managersContact"
									name="managersContact"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Eg: 0201289778/0552311893
								</p>
								<ErrorMessage name="managersContact" render={renderError} />
							</div>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									<Field
										type="text"
										className="form-control"
										placeholder="Porter's Name"
										name="portersName"
									/>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Francis Dogbe
									</p>
									<ErrorMessage name="portersName" render={renderError} />
								</div>
								<div className="col-md-6 col-sm-12">
									<Field
										type="tel"
										name="portersContact"
										className="form-control"
										placeholder="Porter's Contact"
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
					<FormikStep>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="number"
									name="roomsTotal"
									className="form-control"
									placeholder="Total Number of Rooms"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 100
								</p>
								<ErrorMessage name="roomsCapacity" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									type="number"
									name="totalBedspaces"
									className="form-control"
									placeholder="Total Bed Spaces"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 100
								</p>
								<ErrorMessage name="roomsCapacity" render={renderError} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<Field
									type="number"
									className="form-control"
									placeholder="Male Capacity"
									name="maleCapacity"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 60
								</p>
								<ErrorMessage name="maleCapacity" render={renderError} />
							</div>
							<div className="col-md-6 col-sm-12">
								<Field
									type="number"
									className="form-control"
									placeholder="Femaile Capacity"
									name="femaleCapacity"
								/>
								<p className="eg-text">
									{" "}
									<span className="required">*</span> Example: 40
								</p>
								<ErrorMessage name="femaleCapacity" render={renderError} />
							</div>
						</div>
					</FormikStep>
					{({ values, setFieldValue }) => ({
						/* <FormikStep>
							<div className="row mt-3">
								<div className="col-md-6 col-sm-12">
									<h5> Facilities</h5>
									{facilities &&
										facilities.map((item) => (
											<div key={item._id} className="form-check">
												<Field
													className="form-check-input"
													type="checkbox"
													name="facilites"
													value={item._id}
												/>
												<label>{item.name}</label>
											</div>
										))}
								</div>
								<div className="col-md-6 col-sm-12">
									<label>upload Cover</label>
									<input
										type="file"
										className="form-control"
										onChange={(e) => {
											setFieldValue("coverImage", e.currentTarget.files[0]);
										}}
									/>
									<ErrorMessage name="coverImage" render={renderError} />
								</div>
							</div>
							<div className="mx-5 mt-3 mb-2">
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									{isDragActive ? (
										<p> drop of files </p>
									) : (
										<p className=" p-2">Click to Load images here</p>
									)}
								</div>
								{accepted &&
									accepted.map((file, i) => {
										return <Thumb key={i} file={file} />;
									})}
							</div>
						</FormikStep> */
					})}
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
	const [completed, setCompleted] = useState(false);
	const currentChild = childrenArray[step];

	function isLastPage() {
		return step === childrenArray.length - 1;
	}

	return (
		<Formik
			{...props}
			validationSchema={currentChild.props?.validationSchema}
			onSubmit={async (values) => {
				console.log(props);
				if (isLastPage() && props) {
					await props?.onSubmit(values);
				}
			}}
		>
			<Form>
				{currentChild}

				{step > 0 ? (
					<button
						style={{ marginRight: 12 }}
						onClick={() => setStep((s) => s - 1)}
						className="btn px-3 py-2"
					>
						Back
					</button>
				) : null}
				<button
					type="submit"
					onClick={() => setStep((s) => s + 1)}
					className="btn  py-2 px-3"
				>
					{isLastPage() ? "Submit" : "Next"}
				</button>
			</Form>
		</Formik>
	);
}
