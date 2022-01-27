import React, { Component } from "react";

export default class StepForm extends Component {
	state = {
		step: 1,
	};

	prev = (step) => {
		this.setState({ step: step - 1 });
	};
	next = (step) => {
		this.setState({ step: step + 1 });
	};
	renderForm(step) {
		switch (step) {
			case 1:
				break;
			case 2:
			case 3:
			case 4:

			default:
				break;
		}
	}
	render() {
		const { step } = this.state;
		return <>{}</>;
	}
}
