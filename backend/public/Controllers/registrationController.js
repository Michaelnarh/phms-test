const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");
const SortBy = require("../utils/sort");

exports.registerResidence = async (req, res) => {
	const residenceId = req.params.residenceId;
	const academicYear = await AcademicYear.findOne({
		slug: req.params.year_slug,
	});

	//check if exist registered residences
	const checkRegistered = await RegistrationTable.findOne({
		academicYear: { _id: `${academicYear?._id}` },

		residence: { _id: `${residenceId}` },
	});

	if (checkRegistered) {
		res.status(400).json({
			status: "error",
			message: "Residence already registered",
		});
	} else {
		try {
			const regTable = await RegistrationTable.create({
				residence: residenceId,
				academicYear: academicYear?._id,
				addedBy: req.params.user_id,
			});

			// const newRegistered = Residence.findById(residenceId).populate({
			// 	path: "location",
			// 	populate: { path: "zone" },
			// });
			res.status(201).json({
				status: "success",
				data: {
					_id: residenceId,

					createdAt: regTable?.createdAt,

					status: regTable?.status,
				},
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message,
			});
		}
	}
};

exports.disabledRegistration = async (req, res) => {
	const residenceId = req.params.residenceId;
	const academicYear = await AcademicYear.findOne({
		slug: req.params.year_slug,
	});

	try {
		await RegistrationTable.findOneAndDelete({
			residence: residenceId,
			academicYear: academicYear?._id,
		});

		res.status(201).json({
			status: "success",
			data: "disabled successful",
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

exports.getRegisteredResidences = async (req, res) => {
	try {
		const zone_id = req.params.zone_id;
		const academic_year = req.params.academic_year;

		const academicYear = await AcademicYear.findOne({ slug: academic_year });
		const currentRegisteredResidencesByYear = await RegistrationTable.find({
			academicYear: { _id: `${academicYear?._id}` },
			status: 1,
		}).populate({
			path: "residence",
			populate: { path: "location", populate: { path: "zone" } },
		});
		// console.log(currentRegisteredResidencesByYear);
		const zoneArray = [];
		currentRegisteredResidencesByYear.forEach((item) => {
			if (
				item?.residence?.location?.zone?.id.toString() === zone_id.toString()
			) {
				const data = {
					name: item?.residence.name,

					zone: item?.residence?.location?.zone?.name,

					createdAt: item?.updatedAt || item?.createdAt,

					reg_id: item?._id,

					status: item?.status,
				};
				zoneArray.push(data);
			}
		});
		const data = zoneArray.filter(
			(value, index, self) =>
				index === self.findIndex((t) => t.name === value.name)
		);
		const newSort = new SortBy(data);
		const sortedArr = newSort.byName();
		res.status(201).json({
			status: "success",
			data: sortedArr.arr,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

exports.displayUnregisteredResidences = async (req, res) => {
	try {
		const zone_id = req.params.zone_id;
		const academic_year = req.params.academic_year;

		const academicYear = await AcademicYear.findOne({ slug: academic_year });
		const currentRegisteredResidencesByYear = await RegistrationTable.find({
			academicYear: { _id: `${academicYear?._id}` },
			status: 1,
		}).populate({
			path: "residence",
			populate: { path: "location", populate: { path: "zone" } },
		});
		// console.log(currentRegisteredResidencesByYear);

		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});

		let zoneArray = [];
		const regZoneArray = [];

		residences.forEach((item) => {
			if (item?.location?.zone?._id.toString() === zone_id.toString()) {
				const data = {
					_id: item?._id,

					name: item?.name,

					zone_id: item?.location?.zone?._id,

					zone: item?.location?.zone?.name,

					status: 0,
				};
				zoneArray.push(data);
			}
		});

		// get all registered residences by zone
		currentRegisteredResidencesByYear.forEach((el) => {
			if (el.residence?.location?.zone?._id.toString() === zone_id.toString()) {
				const data = {
					_id: el?.residence?._id,

					name: el?.residence?.name,

					zone_id: el?.residence?.location?.zone?._id,

					zone: el?.residence?.location?.zone?.name,

					status: 1,
				};
				regZoneArray.push(data);
			}
		});

		//remove duplicate from the array
		const newZoneArray = zoneArray.filter(
			(value, index, self) =>
				index === self.findIndex((t) => t.name === value.name)
		);
		//remove duplicate in reg array if any
		const newRegZoneArray = regZoneArray.filter(
			(value, index, self) =>
				index === self.findIndex((t) => t.name === value.name)
		);

		const indexes = [];
		newZoneArray.forEach((el, i) => {
			newRegZoneArray.forEach((o, j) => {
				if (el.name.toString() === o.name.toString()) {
					indexes.push(i);
				}
			});
		});

		// remove object based on a particular index
		let count = 0;
		for (let i = 0; i < indexes.length; i++) {
			if (i === indexes[i]) {
				newZoneArray.splice(0, 1);
				count++;
			} else {
				newZoneArray.splice(indexes[i] - count, 1);
				count++;
			}
		}

		//sort array baseed on names
		const mySort = new SortBy(newZoneArray);
		const sortedArray = mySort.byName();

		res.status(201).json({
			status: "success",
			data: sortedArray.arr,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};
