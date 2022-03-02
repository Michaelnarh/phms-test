import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Searchform(props) {
	const { data } = props.data;
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
	};

	return (
		<>
			<div className="search-area">
				<div>
					<input
						className="search-box"
						onChange={(e) => onChangeHandler(e.target.value)}
						value={text}
						placeholder="Search Hostel"
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
			{suggestions && (
				<div className="suggestions-area">
					{suggestions.slice(0, 6).map((item, index) => {
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
		</>
	);
}
