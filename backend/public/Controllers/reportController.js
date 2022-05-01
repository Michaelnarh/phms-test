const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");
const SortBy = require("../utils/sort");

exports.getOwners = async (req, res) => {
	try {
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		let ownersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				ownersName: el.ownersName,
				ownersContact: el.ownersContact,
				zone: el?.location?.zone?.name,
			};

			ownersArray.push(data);
		});
		const sortBy = new SortBy(ownersArray);
		const result = sortBy.byName().byZone();
		res.status(201).json({
			status: "success",
			data: result.arr,
		});
	} catch (err) {
		res.status(201).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getManagers = async (req, res) => {
	try {
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		let ownersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				managersName: el.managersName,
				managersContact: el.managersContact,
				zone: el?.location?.zone?.name,
			};

			ownersArray.push(data);
		});
		const sortBy = new SortBy(ownersArray);
		const result = sortBy.byName().byZone();
		res.status(201).json({
			status: "success",
			data: result.arr,
		});
	} catch (err) {
		res.status(201).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getPorters = async (req, res) => {
	try {
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		let ownersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				portersName: el.portersName,
				portersContact: el.portersContact,
				zone: el?.location?.zone?.name,
			};

			ownersArray.push(data);
		});
		const sortBy = new SortBy(ownersArray);
		const result = sortBy.byName().byZone();
		res.status(201).json({
			status: "success",
			data: result.arr,
		});
	} catch (err) {
		res.status(201).json({
			status: "success",
			message: err.message,
		});
	}
};
