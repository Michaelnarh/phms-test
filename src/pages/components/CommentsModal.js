import react, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CustomButton } from "./stylecomponents";
import { FaStar } from "react-icons/fa";
function ComomentsModal() {
	const [show, setShow] = useState(false);
	const [rating, setRating] = useState(0);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
			>
				<Modal.Header closeButton>
					<Modal.Title>Leave a Comment </Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
						<textarea className="form-control" rows="8"></textarea>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary">Submit</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ComomentsModal;
