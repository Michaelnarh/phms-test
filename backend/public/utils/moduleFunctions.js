export const removeDuplicate = (arr) => {
	return arr.filter(
		(value, index, self) =>
			index === self.findIndex((t) => t.name === value.name)
	);
};
