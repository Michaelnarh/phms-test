import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";

export const ReviewSModal = ({ reviews, name }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div>
			<p className="btn" onClick={() => handleShow()}>
				Read More ....
			</p>
			<Modal
				show={show}
				onHide={handleClose}
				// backdrop="static"
				dialogClassName="modal-width"
				keyboard={false}
				className="margin-top"
				fullscreen={true}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Reviews For <b>{name} </b>{" "}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{reviews.map((comment) => (
						<div className="review-box" key={comment?._id}>
							<p className="review-comments">
								<span>
									<b>Comment:</b>{" "}
								</span>
								{comment.review}
							</p>
							<p>
								<b>Rating:</b> <span>{comment.rating}</span>{" "}
								<span>
									{" "}
									<IoIosStar size={15} color="orange" />
								</span>
							</p>
							<p>
								<b>By:</b> <span>{comment.author?.username}</span>{" "}
							</p>
							<li>{comment.createdAt}</li>
						</div>
					))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleClose()}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
