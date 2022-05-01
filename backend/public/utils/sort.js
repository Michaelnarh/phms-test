// // sort by value

class SortBy {
	constructor(arr) {
		this.arr = arr;
	}
	byName() {
		this.arr.sort(function (a, b) {
			const nameA = a.name.toUpperCase(); // ignore upper and lowercase
			const nameB = b.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
		return this;
	}
	byZone() {
		this.arr.sort(function (a, b) {
			const nameA = a.zone.toUpperCase(); // ignore upper and lowercase
			const nameB = b.zone.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
		return this;
	}
	byDate() {
		this.arr.sort(function (a, b) {
			const timeA = a.createdAt; // ignore upper and lowercase
			const timeB = b.createdAt; // ignore upper and lowercase
			if (timeA < timeB) {
				return -1;
			}
			if (timeA > timeB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
		return this;
	}
}

module.exports = SortBy;
