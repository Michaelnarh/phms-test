import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CustomButton } from "./stylecomponents";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "./utils/AxiosBase";
import LogInModal from "./auth/Login";
const CommentsModal = (props) => {
	const { id, auth } = props;
	const user = JSON.parse(localStorage.getItem("user"));
	const [show, setShow] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [rating, setRating] = useState(0);
	const [text, setText] = useState("");
	const [err, setError] = useState("");

	const handlechange = () => {
		if (auth) {
			setShow(!show);
		}
	};

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
				handlechange();
				setText("");
				toast.success("Message sent Successfully");
				setRating(0);
			}
		}
	};
	return (
		<>
			<CustomButton className="my-3" onClick={handlechange}>
				Leave a Comment
			</CustomButton>
			<Modal
				show={show}
				onHide={handlechange}
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
					<Button variant="secondary" onClick={() => handlechange()}>
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

export default CommentsModal;
