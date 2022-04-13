import { FieldArray, Form, Formik } from "formik";
import React from "react";

export default function Checkoutarrayform(props) {
	const initialValues = {
		name: "",
	};

	return (
		<>
			<Formik>
				<Form>
					<FieldArray name="facilites" render={(arrayHelpers) => <div></div>} />
				</Form>
			</Formik>
		</>
	);
}
