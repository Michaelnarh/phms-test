import styled from "styled-components";
export const CustomButton = styled.div`
	padding: 0.8rem 1rem;
	background-image: linear-gradient(to right, var(--tqColor), var(--darkBlue));
	color: ${(props) => (props.textColor ? props.textColor : "var(--mainWhite)")};
	border-radius: 10px;
	text-align: center;
	width: fit-content;
	font-weight: 500;
	&:hover {
		cursor: pointer;
		// background-image: linear-gradient(
		// 	to right,
		// 	var(--darkBlue),
		// 	var(--mainOrange)
		// );
	}
`;
