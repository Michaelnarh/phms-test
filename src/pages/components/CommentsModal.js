import react, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CustomButton } from "./stylecomponents";
function ComomentsModal() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			{/* <CustomButton className="m-5">Leave a Comment</CustomButton> */}
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
					I will not close if you click outside me. Don't even try to press
					escape key.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary">Understood</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ComomentsModal;
