import { FieldArray, Form, Formik, Field } from "formik";
import React from "react";

export default function Checkoutarrayform(props) {
	const initialValues = {
		facilities: [
			{
				id: null,
				count: 0,
			},
		],
	};

	const arr = [
		{ id: "15576755", name: "CCTV" },
		{ id: "244546656", name: "Cleaners" },
		{ id: "35r5654564", name: "Security" },
		{ id: "46546546", name: "Collections" },
		{ id: "5675765", name: "Study Room" },
	];

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form>
					<FieldArray
						name="facilites"
						render={(arrayHelpers) => (
							<div>
								{arr.map((name, i) => {
									return (
										<div key={i} className="row">
											<div className="col-md-2 mb-3">
												<label>
													<Field
														name={`facilities[${i}].id`}
														type="checkbox"
														value={arr[i].id}
													/>
													{arr[i].name}
												</label>
											</div>
											<div className="col-md-2 ml-3 mb-3">
												<Field type="number" name={`facilities[${i}].count`} />
											</div>
										</div>
									);
								})}
							</div>
						)}
					/>
					<button type="submit">submit</button>
				</Form>
			</Formik>
		</>
	);
}
