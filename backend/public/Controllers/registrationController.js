const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");

exports.registerResidence = async (req, res) => {
	const residenceId = req.params.residenceId;
	const { _id } = await AcademicYear.findByOne({ slug: req.params.year_slug });

	try {
		await RegistrationTable.create({
			residence: residenceId,
			academicYear: _id,
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
	const { _id } = await AcademicYear.findByOne({ slug: req.params.year_slug });

	try {
		await RegistrationTable.create({
			residence: residenceId,
			academicYear: _id,
			status: 0,
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

exports.getRegisteredResidences = async (req, res) => {
	try {
		const zone_id = req.params.zone_id;
		const academic_year = req.params.academic_year;

		const filterZone = (item) => {
			return item?.location?.zone?.id === zone_id;
		};

		const filterRegistered = (arr, year) => {
			return arr.filter(function (el) {
				return el?._id === year?._id;
			});
		};

		const residences = await Residence.find().populate({
			path: "location",
			populate: { path: "zone" },
		});
		const acedemichYear = await AcademicYear.find({ slug: academic_year });

		const currentZones = residences.filter(filterZone());

		const registeredResidences = filterRegistered(currentZones, acedemichYear);

		res.status(201).json({
			status: "success",
			data: registeredResidences,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
	const zone_id = req.params.zone_id;
	const academic_year = req.params.academic_year;
	const filterZone = (item) => {
		return item?.location?.zone?.id === zone_id;
	};

	const filterRegistered = (arr, year) => {
		return arr.filter(function (el) {
			return el?._id === year?._id;
		});
	};

	const residences = await Residence.find().populate({
		path: "location",
		populate: { path: "zone" },
	});
	const acedemichYear = await AcademicYear.find({ slug: academic_year });
	const currentZones = residences.filter(filterZone());

	const registeredResidences = filterRegistered(currentZones, acedemichYear);
};
