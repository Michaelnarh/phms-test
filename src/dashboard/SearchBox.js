import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Searchbox(props) {
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
			<div>
				<div className="search-box mt-5">
					<input
						type="text"
						className=""
						onChange={(e) => onChangeHandler(e.target.value)}
						value={text}
						placeholder={`search ${type} name`}
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
