import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapComponent() {
	const defaultProps = {
		center: {
			lat: 6.672387,
			lng: -1.56323,
		},
		zoom: 11,
	};

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "80vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyAKMQRBKrwmhH81MDuT65XOpOPXcuHTn5A" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent lat={59.955413} lng={30.337844} text="New Hostel" />
			</GoogleMapReact>
		</div>
	);
}
