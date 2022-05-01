import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbox(props) {
	const { data, type } = props;
	const navigate = useNavigate();
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

		navigate(`${res.data.data[0].slug}`);
	};
	return (
		<>
			<div>
				<div className="search-box mt-5">
					<div>
						<input
							type="text"
							className="p-2"
							onChange={(e) => onChangeHandler(e.target.value)}
							value={text}
							placeholder={`Search ${type} by Name`}
						/>
					</div>
					<div className="ml-2" style={{ marginLeft: 3 }}>
						<button className="btn p-2 " onClick={() => handleSearch(text)}>
							SEARCH
						</button>
					</div>
				</div>
				{suggestions && (
					<div className="suggestions-area">
						{suggestions.slice(0, 7).map((item, index) => {
							return (
								<div key={item?._id}>
									<h5
										className="suggest-list"
										onClick={() => onSuggestion(item.name)}
									>
										{item.name}
									</h5>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
