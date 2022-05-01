import react, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CustomButton } from "./stylecomponents";
import { FaStar } from "react-icons/fa";
import axios from "axios";
const CommentsModal = (props) => {
	const { id } = props;
	const user = JSON.parse(localStorage.getItem("user"));
	const [show, setShow] = useState(false);
	const [rating, setRating] = useState(0);
	const [text, setText] = useState("");
	const [err, setError] = useState("");
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleComment = async () => {
		console.log(text, rating, user, id);
		if (!text) {
			setError("Comment Message is Required");
		} else if (rating === 0) {
			setError("Rating is Required");
		} else if (rating === 0 || !text) {
			setError("Rating and Comment is Required");
		} else {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}/api/v1/reviews`,
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
				handleClose();
				setText("");
				setRating(0);
			}
		}
	};
	return (
		<>
			<CustomButton className="my-3" onClick={handleShow}>
				Leave a Comment
			</CustomButton>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="margin-top"
			>
				<Modal.Header closeButton>
					<Modal.Title>Leave a Comment </Modal.Title>
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
					<Button variant="secondary" onClick={() => handleClose()}>
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
