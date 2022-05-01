import { useState } from "react";
import { css } from "@emotion/react";
import {
	CircleLoader,
	BarLoader,
	ClipLoader,
	HashLoader,
	BeatLoader,
} from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

export default function CustomSpinner({ isLoading, color, type }) {
	// let [color, setColor] = useState("#555");

	return (
		<div className="spinner-style">
			{type === "circle" ? (
				<ClipLoader
					color={`${color ? color : "#90b7ce"}`}
					loading={isLoading}
					css={override}
					size={150}
				/>
			) : type === "beat" ? (
				<BeatLoader
					color={`${color ? color : "#90b7ce"}`}
					loading={isLoading}
					css={override}
					size={150}
				/>
			) : type === "bar" ? (
				<BarLoader
					color={`${color ? color : "#90b7ce"}`}
					loading={isLoading}
					css={override}
					size={150}
				/>
			) : type === "hash" ? (
				<HashLoader
					color={`${color ? color : "#90b7ce"}`}
					loading={isLoading}
					css={override}
					size={150}
				/>
			) : (
				<CircleLoader
					color={`${color ? color : "#90b7ce"}`}
					loading={isLoading}
					css={override}
					size={150}
				/>
			)}
		</div>
	);
}
