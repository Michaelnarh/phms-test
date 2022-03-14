function buildFormData(formData, data, parentKey) {
	if (data && typeof data === "object" && data instanceof File) {
		Object.keys(
			data.forEach((key) => {
				buildFormData(
					formData,
					data[key],
					parentKey ? `${parentKey}[${key}]` : key
				);
			})
		);
	} else {
		const value = data === null ? "" : data;
		formData.append(parentKey, value);
	}
}
const JsonToFormData = (data) => {
	let formData = new FormData();
	console.log(data);

	buildFormData(formData, data);

	return data;
};

export default JsonToFormData;
