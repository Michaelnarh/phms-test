import React, { useState } from "react";

export default function StepForm() {
	const [step, setStep] = useState(1);

	const rerderForm = (step) => {
		switch (step) {
			case 1:
				break;
			case 2:
			case 3:
			case 4:

			default:
				break;
		}
	};

	return (
		<>
			<rerderForm />
		</>
	);
}
