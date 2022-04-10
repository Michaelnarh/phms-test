const Class = require("../Models/classModel");

//create new Class
exports.createClass = async (req, res) => {
	try {
		const newClass = await Class.create(req.body);
		res.status(201).json({
			status: "success",
			data: newClass,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a Class
exports.updateClass = async (req, res) => {
	if (!req.params.id) {
		throw Error(" Residence Class not identified");
	}
	try {
		const rClass = await Class.findByIdAndUpdate(req.params.id, req.body);
		res.status(201).json({
			status: "success",
			data: rClass,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular class of residece
exports.getClass = async (req, res) => {
	try {
		const resultClass = await Class.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: resultClass,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all Classes

exports.getAllClasses = async (req, res) => {
	try {
		const rClass = await Class.find();
		res.status(200).json({
			status: "success",
			data: rClass,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a particular class category
exports.deleteClass = async (req, res) => {
	try {
		const class_id = req.params.id;
		if (!class_id) throw new Error("Class id is required for this operation");
		const rClass = await Class.findById(class_id);
		await Class.findByIdAndDelete(class_id);
		res.status(200).json({
			status: "success",
			message: `Class records of  ${rClass.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
