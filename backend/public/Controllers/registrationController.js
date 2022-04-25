const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");

exports.registerResidence = async (req, res) => {
	const residenceId = req.params.residenceId;
	const { _id } = await AcademicYear.findOne({ slug: req.params.year_slug });

	try {
		await RegistrationTable.create({
			residence: residenceId,
			academicYear: _id,
			addedBy: req.body.user,
		});
		res.status(201).json({
			status: "success",
			data: "registraion successful",
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
	const { _id } = await AcademicYear.findOne({ slug: req.params.year_slug });

	try {
		await RegistrationTable.create({
			residence: residenceId,
			academicYear: _id,
			status: 0,
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

		const acedemichYear = await AcademicYear.findOne({ slug: academic_year });

		const currentRegisteredResidencesByYear = await RegistrationTable.find({
			acedemichYear: acedemichYear?._id,
			status: 1,
		}).populate({
			path: "residence",
			populate: { path: "location", populate: { path: "zone" } },
		});

		const zoneArray = [];
		currentRegisteredResidencesByYear.forEach((item) => {
			if (item?.residence?.location?.zone?.id === zone_id) {
				const data = {
					name: item?.residence.name,

					zone: item?.residence?.location?.zone?.name,

					createdAt: item?.updatedAt || item?.createdAt,

					status: item?.status,
				};
				zoneArray.push(data);
			}
		});

		res.status(201).json({
			status: "success",
			data: zoneArray,
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

		const filterZone = (item) => {
			return item?.residennce?.location?.zone?.id === zone_id;
		};

		const filterRegistered = (arr, year) => {
			return arr.filter(function (el) {
				return el?._id === year?._id;
			});
		};

		const acedemichYear = await AcademicYear.find({ slug: academic_year });

		const currentregisteredResidenceByYear = await RegistrationTable.find({
			acedemichYear: acedemichYear?._id,
			status: 1,
		}).populate({
			path: "residence",
			select: "location",
			populate: { path: "zone" },
		});

		const currentResidenceRegisteredByZone =
			currentregisteredResidenceByYear.filter(filterZone());

		// const registeredResidences = filterRegistered(currentZones, acedemichYear);

		res.status(201).json({
			status: "success",
			data: currentResidenceRegisteredByZone,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};
