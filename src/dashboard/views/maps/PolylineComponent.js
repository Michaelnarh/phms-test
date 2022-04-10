export default function Polylinecomponent({ map, maps }) {
	const zone_path = [
		{ lat: 6.66985, lng: -1.55857 },
		{ lat: 6.67006, lng: -1.56116 },
		{ lat: 6.67052, lng: -1.56254 },
		{ lat: 6.67065, lng: -1.56361 },
		{ lat: 6.67563, lng: -1.56362 },
		{ lat: 6.67597, lng: -1.55959 },
		{ lat: 6.67589, lng: -1.55896 },
		{ lat: 6.66985, lng: -1.55857 },
	];

	const path = new maps.Polyline({
		path: zone_path,
		geodesic: true,
		strokeColor: "#7e3232;",
		strokeOpacity: 1.0,
		strokeWeight: 2,
	});

	path.setMap(map);
	return null;
}
