import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
	{
		url: "	http://localhost:3000/static/media/adom_bi.34b84a67d80286e37735.jpg",
		caption: "Slide 1",
	},
	{
		url: "	http://localhost:3000/static/media/adom_bi.34b84a67d80286e37735.jpg",
		caption: "Slide 2",
	},
	{
		url: "	http://localhost:3000/static/media/adom_bi.34b84a67d80286e37735.jpg",
		caption: "Slide 3",
	},
];

export default function Slideshow() {
	return (
		<div className="slide-container">
			<Slide style={{ height: 200 }}>
				{slideImages.map((slideImage, index) => (
					<div className="each-slide" key={index}>
						<div style={{ backgroundImage: `url(${slideImage.url})` }}>
							<span>{slideImage.caption}</span>
						</div>
					</div>
				))}
			</Slide>
		</div>
	);
}
