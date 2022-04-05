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

	const renderMarker = (map, maps) => {
		let marker = new maps.Marker({
			position: { lat: 6.672186, lng: -1.57854 },
			maps,
			title: "hostels data",
			name: "regMap",
		});
		return marker;
	};

	return (
		<div style={{ height: "80vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				yesIWantToUseGoogleMapApiInternals={true}
				onGoogleApiLoaded={({ map, maps }) => {
					renderMarker(map, maps);
				}}
			>
				<AnyReactComponent lat={59.955413} lng={30.337844} text="New Hostel" />
			</GoogleMapReact>
		</div>
	);
}
