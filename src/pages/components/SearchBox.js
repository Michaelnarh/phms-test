import axios from "axios";
import React, { useState } from "react";

export default function Searchbox(props) {
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
		console.log("searching");
		const res = await axios.get(
			`http://localhost:8080/api/v1/residences/search?${text}`
		);
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
					<div className="ml-2">
						<button className="btn p-2 " onClick={() => handleSearch(text)}>
							SEARCH
						</button>
					</div>
				</div>
				{suggestions && (
					<div className="suggestions-area">
						{suggestions.slice(0, 5).map((item, index) => {
							return (
								<>
									<div key={index}>
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
				)}
			</div>
		</>
	);
}
