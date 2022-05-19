export function parseJwt(token) {
	var base64Url = token?.split(".")[1];
<<<<<<< HEAD
	var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
=======
	var base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			?.split("")
			?.map(function (c) {
>>>>>>> 01e3bdeebd4d12bae0ed3f1e93778e0f057e4b2a
				return "%" + ("00" + c?.charCodeAt(0)?.toString(16))?.slice(-2);
			})
			?.join("")
	);

	return JSON.parse(jsonPayload);
}
