const JsonToFormData = (item) => {
	let formData = new FormData();
	for (var key in item) {
		formData.append(key, item[key]);
	}

	return item;
};

export default JsonToFormData;
