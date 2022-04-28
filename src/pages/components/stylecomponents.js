import styled from "styled-components";

export const CustomButton = styled.p`
	padding: 6px;
	background-image: linear-gradient(to right, var(--tqColor), var(--darkBlue));
	color: ${(props) => (props.textColor ? props.textColor : "var(--mainWhite)")};
	border-radius: 10px;
	text-align: center;
	&:hover {
		cursor: pointer;
		background-image: linear-gradient(
			to right,
			var(--darkBlue),
			var(--mainWhite)
		);
	}
	@media (max-width: 768px) {
		boder-radius: 6px;
		font-size: 12px;
	}
`;

export const Divider = styled.div`
	border: 5px solid ${(props) => (props.color ? props.color : "var(--tqColor)")};
	width: 80px;
	margin-bottom: 18px;
	color: ${(props) => (props.color ? props.color : "var(--tqColor)")};
`;
