const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");

exports.registerResidence = async (req, res) => {
	const residenceId = req.params.residenceId;
	const academicYear = await AcademicYear.findOne({
		slug: req.params.year_slug,
	});
	console.log(academicYear);
	try {
		console.log(academicYear);
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
			academicYear: academicYear?._id,
			status: 1,
		}).populate({
			path: "residence",
			populate: { path: "location", populate: { path: "zone" } },
		});

		const zoneArray = [];
		currentRegisteredResidencesByYear.forEach((item) => {
			if (
				item?.residence?.location?.zone?.id.toString() === zone_id.toString()
			) {
				const data = {
					name: item?.residence.name,

					zone: item?.residence?.location?.zone?.name,

					createdAt: item?.updatedAt || item?.createdAt,

					status: item?.status,
				};
				zoneArray.push(data);
			}
		});
		const data = zoneArray.filter(
			(value, index, self) =>
				index === self.findIndex((t) => t.name === value.name)
		);
		res.status(201).json({
			status: "success",
			data: data,
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
			academicYear: academicYear?._id,
			status: 1,
		}).populate({
			path: "residence",
			populate: { path: "location", populate: { path: "zone" } },
		});

		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		// const lookup = await Residence.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: "Registration",
		// 			let: { _id: "$_id", name: "$name" },
		// 			pipeline: [
		// 				{ $match: { $expr: { $and: [{ $eq: ["$_id", "$$_id"] }] } } },
		// 			],
		// 			as: "data",
		// 		},
		// 	},
		// 	{ $match: { data: [] } },
		// 	{ $project: { data: 0, _id: 0 } },
		// ]);

		// console.log(lookup);

		let zoneArray = [];

		residences.forEach((item) => {
			if (currentRegisteredResidencesByYear.length === 0) {
				const data = {
					_id: item?._id,

					name: item?.name,

					zone_id: item?.location?.zone?._id,

					zone: item?.location?.zone?.name,

					status: 0,
				};
				zoneArray.push(data);
			} else {
				currentRegisteredResidencesByYear.forEach((el) => {
					if (item?._id.toString() === el?.residence.toString()) {
						//do nothing
					} else {
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
			}
		});

		// console.log(zoneArray);

		//remove duplicate from the array
		const newZoneArray = zoneArray.filter(
			(value, index, self) =>
				index === self.findIndex((t) => t.name === value.name)
		);

		//filter for a particular zone only ie returns
		function isZone(item) {
			return item.zone_id.toString() === zone_id.toString();
		}

		const myarray = newZoneArray?.filter(isZone);

		let unRegisteredArray = [];
		console.log(currentRegisteredResidencesByYear);
		myarray.forEach((el) => {
			currentRegisteredResidencesByYear.forEach((o) => {
				if (el?._id.toString() !== o.residence?._id.toString()) {
					unRegisteredArray.push(el);
				}
			});
		});

		const data = unRegisteredArray.filter(
			(value, index, self) =>
				index ===
				self.findIndex((t) => t._id.toString() === value._id.toString())
		);
		res.status(201).json({
			status: "success",
			data: unRegisteredArray,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};
