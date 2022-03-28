const Location = require("../Models/locationModel");

//create new Location
exports.createLocation = async (req, res) => {
	try {
		const newLocation = await Location.create(req.body);
		res.status(201).json({
			status: "success",
			data: newLocation,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a location
exports.updateLocation = async (req, res) => {
	if (!req.params.id) {
		throw Error("Location  not identified");
	}
	try {
		let date = new Date();
		req.body.updatedAt = date;
		const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(201).json({
			status: "success",
			data: location,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular zone
exports.getlocation = async (req, res) => {
	try {
		const location = await Location.findById(req.params.id).populate("zone");
		res.status(200).json({
			status: "success",
			data: location,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all locations
exports.getAllLocations = async (req, res) => {
	try {
		const locations = await Location.find().populate("zone");

		res.status(200).json({
			status: "success",
			data: locations,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a Location
exports.deleteLocation = async (req, res, next) => {
	try {
		const location_id = req.params.id;
		if (!location_id)
			throw new Error("Location id is required for this operation");
		const location = await Location.findById(location_id);
		await Location.findByIdAndDelete(location_id);
		res.status(200).json({
			status: "success",
			message: `The location name  ${location.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
