import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Searchbox(props) {
	const { data } = props;
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
		console.log(res);
	};
	return (
		<>
			<div>
				<div className="search-box mt-5">
					<input
						type="text"
						className=""
						onChange={(e) => onChangeHandler(e.target.value)}
						value={text}
						placeholder="search hostel name"
					/>
					<FaSearch
						onClick={() => handleSearch(text)}
						className="search-icon"
						size={30}
						color="var(--darkBlue)"
					/>
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
