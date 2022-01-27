import styled from "styled-components";

export const CustomButton = styled.h5`
	padding: 1rem;
	background-image: linear-gradient(to right, var(--tqColor), var(--darkBlue));
	color: ${(props) => (props.textColor ? props.textColor : "var(--mainWhite)")};
	border-radius: 10px;
	text-align: center;
	&:hover {
		background-image: linear-gradient(
			to right,
			var(--darkBlue),
			var(--mainOrange)
		);
	}
`;

export const Divider = styled.div`
	border: 5px solid var(--tqColor);
	width: 80px;
	margin-bottom: 18px;
`;
