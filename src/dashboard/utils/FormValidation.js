export function checkIfFilesSize(files) {
	let valid = true;
	if (files) {
		files.forEach((file) => {
			const size = file.size / 1024 / 1024;
			if (size > 100) {
				valid = false;
			}
		});
	}
	return valid;
}

export function checkIfFilesType(files) {
	let valid = true;
	if (files) {
		files.forEach((file) => {
			if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
				valid = false;
			}
		});
	}
	return valid;
}
