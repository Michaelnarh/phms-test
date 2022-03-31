import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Searchform(props) {
	const navigate = useNavigate();
	const { data, type } = props;
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const onChangeHandler = (text) => {
		setText(text);
		if (text.length <= 0) {
			setSuggestions([]);
		}
		if (text.length > 0) {
			let matches = [];
			matches = data.filter((data) => {
				const regex = new RegExp(`${text}`, "gi");
				return data.name.match(regex);
			});

			setText(text);
			setSuggestions(matches);
		}
	};
	const onSuggestion = (text) => {
		setText(text);
		setSuggestions([]);
	};
	const handleSearch = async (text) => {
		if (!text) return;
		console.log("searching...", text);
		var data = JSON.stringify({
			search: `${text}`,
		});
		const res = await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/v1/residences/search`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});

		navigate(`details/${res.data.data[0]._id}`);
	};

	return (
		<>
			<div className="search-area-dash">
				<div>
					<input
						className="search-box-dash"
						onChange={(e) => onChangeHandler(e.target.value)}
						value={text}
						placeholder={`Search ${type} by name`}
					/>
				</div>
				<div>
					<button
						onClick={() => handleSearch(text)}
						className=" btn  form-control"
					>
						SEARCH
					</button>
				</div>
			</div>
			<div className="suggestions-area-dash">
				{suggestions &&
					suggestions.slice(0, 6).map((item, index) => {
						return (
							<>
								<div key={item._id}>
									<h5
										className="suggest-list"
										onClick={() => onSuggestion(item.name)}
									>
										{item.name}
									</h5>
								</div>
							</>
						);
					})}
			</div>
		</>
	);
}
