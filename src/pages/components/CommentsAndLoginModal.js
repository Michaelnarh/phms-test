import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renderError } from "./utils/ModuleFunctions";
import AxiosInstance from "./utils/AxiosBase";
import { ToastContainer, toast } from "react-toastify";
import { CustomButton } from "./stylecomponents";
import { FaStar } from "react-icons/fa";
import LogInModal from "./auth/Login";
import AuthStore from "../../store/AuthStore";
import * as Yup from "yup";

function CommentsAndLogInModal(props) {
	const auth = new AuthStore();
	const { isLogin } = props;
	const [show, setShow] = useState(false);
	const [isLoggedin, setModal] = useState(false);
	const handleClose = () => setShow(false);
	function handleShow() {
		setShow(true);
	}

	const validationSchema = Yup.object({
		username: Yup.string().required("Username is Required"),
		referenceNumber: Yup.number()
			.min(7, "Must be 8 Digits")
			.required("Reference Number is Required"),
		password: Yup.string()
			.min(2, "character too short, should be 5 and above")
			.required("Password is Required"),
	});

	const initialValues = {
		username: "",
		password: "",
		referenceNumber: "",
	};
	const handleSubmit = async (values) => {
	
		const res = await AxiosInstance({
			method: "post",
			// post to the uits students portal
			// url: `${process.env.REACT_APP_API_URL}/api/v1/academic-year`,
			headers: {
				"Content-Type": "application/json",
			},
			data: values,
		});
		handleClose();
		setModal(true);
		if (res.data?.status === "success") {
			toast.success("Login successful");
		}
		if (res.data?.status === "fail" || res.data?.status === "error") {
			toast.error(res?.data?.response?.error?.message);
		}
	};
	return (
		<>
			<CustomButton className="my-3" onClick={() => handleShow(false)}>
				Leave a Comment
			</CustomButton>

			{isLoggedin && (
				<CommentsModal isLoggedin={isLoggedin} setModal={setModal} />
			)}
			<Modal
				show={show}
				onHide={handleClose}
				keyboard={false}
				className="margin-top"
			>
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						console.log(values);
						await handleSubmit(values);
						resetForm();
					}}
				>
					<Form>
						<Modal.Header closeButton>
							<Modal.Title>Login</Modal.Title>
							<ToastContainer />
						</Modal.Header>
						<Modal.Body>
							<div className="">
								<div className=" col-md-8 col-sm-12 mx-auto">
									<label>
										<b>Username</b>
										<span className="required">*</span>
									</label>
									<Field type="text" className="form-control" name="username" />
									<p className="eg-text">ssjames</p>
									<ErrorMessage name="username" render={renderError} />
								</div>
								<div className=" mx-auto mt-3 col-md-8 col-sm-12">
									<label>
										<b>Password</b>
										<span className="required">*</span>
									</label>
									<Field
										type="password"
										className="form-control"
										name="password"
									/>
									<ErrorMessage name="password" render={renderError} />
								</div>
								<div className=" mx-auto mt-3 col-md-8 col-sm-12">
									<label>
										<b>Reference Number</b>
										<span className="required">*</span>
									</label>
									<Field
										type="number"
										className="form-control"
										name="referenceNumber"
									/>
									<p className="eg-text">20522750</p>
									<ErrorMessage name="referenceNumber" render={renderError} />
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								type="button"
								onClick={() => handleClose()}
							>
								Close
							</Button>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Modal.Footer>
					</Form>
				</Formik>
			</Modal>
		</>
	);
}

export default CommentsAndLogInModal;

export const CommentsModal = (props) => {
	const { isLoggedin, setModal } = props;
	const user = JSON.parse(localStorage.getItem("user"));
	const id = JSON.parse(localStorage.getItem("dumb"));
	const [show, setShow] = useState(false);
	// const [isLogin, setIsLogin] = useState(false);
	const [rating, setRating] = useState(0);
	const [text, setText] = useState("");
	const [err, setError] = useState("");

	const handleComment = async () => {
		console.log(text, rating, user, id);
		if (!text) {
			setError("Comment Message is Required");
		} else if (rating === 0) {
			setError("Rating is Required");
		} else if (rating === 0 || !text) {
			setError("Rating and Comment is Required");
		} else if (!user) {
			toast("You are not login in ");
			setError("You are not login in ");
		} else {
			const res = await AxiosInstance({
				method: "post",
				url: `/api/v1/reviews`,
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					review: text,
					author: user?._id,
					residence: id,
					rating: rating,
				},
			});
			if (res.data?.status === "success") {
				setText("");
				toast.success("Message sent Successfully");
				setRating(0);
			}
		}
	};
	return (
		<>
			<CustomButton className="my-3" onClick={() => setModal(true)}>
				Leave a Comment
			</CustomButton>
			<Modal
				show={isLoggedin}
				onHide={setModal(isLoggedin)}
				backdrop="static"
				keyboard={false}
				className="margin-top"
			>
				<Modal.Header closeButton>
					<Modal.Title>Leave a Comment </Modal.Title>
					<ToastContainer />
				</Modal.Header>
				<Modal.Body>
					{err && <p className="text-danger">{err}</p>}
					<FaStar
						size={35}
						onClick={() => setRating(1)}
						className={rating >= 1 ? "star-color" : ""}
					/>
					<FaStar
						size={35}
						onClick={() => setRating(2)}
						className={rating >= 2 ? "star-color" : ""}
					/>
					<FaStar
						size={35}
						onClick={() => setRating(3)}
						className={rating >= 3 ? "star-color" : ""}
					/>
					<FaStar
						size={35}
						onClick={() => setRating(4)}
						className={rating >= 4 ? "star-color" : ""}
					/>
					<FaStar
						size={35}
						onClick={() => setRating(5)}
						className={rating >= 5 ? "star-color" : ""}
					/>

					<Form>
						<Form.Label>Your message</Form.Label>
						<textarea
							value={text}
							className="form-control"
							rows="8"
							onChange={(e) => setText(e.target.value)}
						></textarea>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModal(!isLoggedin)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => handleComment()}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
