const Iframe = ({ lat, lng }) => {
	// 6.6848275,-1.5723632
	// 6.6848275,-1.5723632
	// 6.6842585,-1.5723974,
	// const lat = 6.6842585;
	// const lng = -1.5723974;
	return (
		<div>
			<iframe
				// src="https://www.google.com/maps/place/Crystal+Rose+hostel/@6.6842585,-1.5723974,15z/data=!4m21!1m12!4m11!1m3!2m2!1d-1.5724832!2d6.6847274!1m6!1m2!1s0xfdb951550541d4d:0x43b208d90612e78e!2sThe+Protestant+Chapel+MCMH%2BP25+Kumasi!2m2!1d-1.5723974!2d6.6842585!3m7!1s0xfdb94f44f8fd96f:0x2a0ce606bf676062!5m2!4m1!1i2!8m2!3d6.686183!4d-1.5567361=UTF8&iwloc=&output=embed"
				// src="https://maps.google.com/maps?q=Protestant%20chapel&t=&z=15&ie=UTF8&iwloc=&output=embed"
				src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
				// src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
				// src="https://www.google.com/maps/place/?embed/Nana+Adomah+Hostel/@6.6726793,-1.565387,17z/data=!3m1!4b1!4m5!3m4!1s0xfdb946337b7a68b:0x8d3bd6086df4dd71!8m2!3d6.6726784!4d-1.5631347"
				overflow="hidden"
				className="iframe-class"
				frameBorder="0"
				// style="border:0;"
				style={{ overflow: "hidden" }}
				allowFullScreen=""
				aria-hidden="false"
				tabIndex="0"
				title="..."
			></iframe>
		</div>
	);
};

export default Iframe;
