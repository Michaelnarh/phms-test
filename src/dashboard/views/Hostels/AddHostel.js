import React, { useState, useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import JsonToFormData from "../../utils/JsonToFormData";
import { useDropzone } from "react-dropzone";

import Thumb from "../../utils/Thumb";

export default function Addhostel(props) {
	const [accepted, setAccepted] = useState([]);
	const [step, setStep] = useState(1);

	const onDrop = useCallback((acceptedFiles) => {
		setAccepted(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const [lat, setlt] = useState(-11.121);
	const [lng, setlg] = useState(21.2122);

	const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
	const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

	const validationSchema = Yup.object({
		name: Yup.string().required("Residence is Required"),
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
		zone: Yup.string().required("Residence Zone is required"),
		// facilities: Yup.array().nullable(),
		regDate: Yup.date().nullable(),
		// coverImage: Yup.string().nullable(),
		// images: Yup.array(),
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
	};

	const renderError = (message) => <p className="text-danger">{message}</p>;

	const onSubmit = async (values) => {
		let formData = new FormData();
		console.log(values.images);

		formData.append("name", values.name);
		formData.append("residenceType", values.residenceType);
		formData.append("location", values.location);
		formData.append("digitalAddress", values.digitalAddress);
		formData.append("bookingLink", values.bookingLink);
		formData.append("managersName", values.managersName);
		formData.append("portersName", values.portersName);
		formData.append("portersName", values.portersName);

		accepted.forEach((el) => {
			formData.append("images", el);
		});

		formData.append("coverImage", accepted[0]);

		values.images = accepted;
		values.coverImage = accepted[0];
		values.gpsAddress.coordinates[1] = lat; //insert latitude data
		values.gpsAddress.coordinates[0] = lng; //insert longitude data

		// const form_data = JsonToFormData(values);
		// alert(JSON.stringify(formData, null, 2));
		console.log(formData);

		const res = await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/v1/residences/62190417a06c031b84009105`,
			headers: {
				accept: "application/json",
			},
			data: formData,
		});
	};

	return (
		<>
			<div className="container">
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					// validationSchema={validationSchema
					onSubmit={async (values, { resetForm }) => {
						await onSubmit(values);
						resetForm();
					}}
				>
					{({ values, setFieldValue }) => (
						<Form>
							<div className="row">
								<div className="col-md-4 col-sm-12">
									{/* <label htmlFor="name">Residence Name</label> */}
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
										type="text"
										className="form-control"
										placeholder="Location"
										aria-label="location"
										name="location"
									/>
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
									<p className="eg-text">
										Example: AK-1310-3223, use GhanaPost
									</p>
									<ErrorMessage name="digitalAddress" render={renderError} />
								</div>
								<div className="col-md-4 col-sm-12">
									<Field
										type="text"
										className="form-control"
										placeholder="+/-90 Latitude"
										// value={alt}
										// onChange={(e) => setlt(e.target.value)}
										// name="alt"
									/>
									<ErrorMessage name="alt" render={renderError} />
									<Field
										type="text"
										className="form-control"
										placeholder="+/-180 longitude"
										// value={lng}
										// name="lng"
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
										<span className="required">*</span> Eg:
										0201289778/0552311893
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
								<div className="row mt-3">
									<div className="col-md-12 col-sm-12">
										<h5> Facilities</h5>
										{/* <div className="form-check">
										<Field
											className="form-check-input"
											type="checkbox"
											value=""
											id="flexCheckDefault"
										/>
										<ErrorMessage name="residenceType" render={renderError} />
										<label
											className="form-check-label"
											htmlFor="flexCheckDefault"
										>
											Default checkbox
										</label>
									</div>
									<div className="form-check">
										<Field
											className="form-check-input"
											type="checkbox"
											value=""
											id="flexCheckChecked"
										/>
										<ErrorMessage name="residenceType" render={renderError} />
										<label
											className="form-check-label"
											htmlFor="flexCheckChecked"
										>
											Checked checkbox
										</label>
									</div> */}
									</div>
								</div>
								<div className="row mt-3">
									{/* <div className="col-md-6 col-sm-12 ">
										<Field
											type="file"
											className="form-control"
											placeholder="Cover Image"
											name="coverImage"
										/>
										<ErrorMessage name="coverImage" render={renderError} />
									</div> */}
								</div>
							</div>
							<div className="row mt-3 ">
								<div className="col-md-4 col-sm-12 ">
									<Field
										as="select"
										name="zone"
										className="form-select"
										aria-label="Default select example"
									>
										<option>Select Zone</option>
										<option value="61efe22b0a51105af3675537">
											Ayeduase North
										</option>
										<option value="61efe22b0a51105af3675537">
											Ayeduase South
										</option>
										<option value="61efe22b0a51105af3675537">
											Kentikrono-gaza
										</option>
									</Field>
									<p className="eg-text">
										{" "}
										<span className="required">*</span> Example: Ayeduase North
									</p>
									<ErrorMessage name="zone" render={renderError} />
								</div>
							</div>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? (
									<p> drop of files </p>
								) : (
									<p>drag and drop files here</p>
								)}
							</div>
							{accepted &&
								accepted.map((file, i) => {
									return <Thumb key={i} file={file} />;
								})}

							<button type="submit" className="btn is-primary">
								Submit
							</button>
						</Form>
					)}
				</Formik>
				<div>{}</div>
			</div>
		</>
	);
}
