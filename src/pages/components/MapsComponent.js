import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Locationmaker from "./Maps/LocationMaker";
import axios from "axios";
import Locationinfobox from "./Maps/LocationInfoBox";

export default function MapComponent() {
	const [eventData, setEvents] = useState([]);
	const [info, setInfo] = useState();
	useEffect(() => {
		const fetchHostels = async () => {
			const res = await axios({
				method: "get",
				url: `https://eonet.gsfc.nasa.gov/api/v2.1/events`,
			});

			setEvents(res.data.events);
		};
		if (eventData.length === 0) {
			fetchHostels();
		}
	});
	console.log(eventData);

	const makers = eventData.map((ev) => {
		if (ev.categories[0].id === 8) {
			return (
				<Locationmaker
					lat={ev.geometries[0].coordinates[1]}
					lng={ev.geometries[0].coordinates[0]}
					onClick={() => setInfo({ id: ev.id, title: ev.title })}
				/>
			);
		}
		return null;
	});

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

	console.log(info);
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
				{/* <Locationmaker
					lat={defaultProps.center.lat}
					lng={defaultProps.center.lng}
				/> */}
				{makers}
			</GoogleMapReact>
			{info && <Locationinfobox info={info} />}
		</div>
	);
}
