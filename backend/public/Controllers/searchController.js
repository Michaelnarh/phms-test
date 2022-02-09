const Residence = require("../Models/residenceModel");

exports.searchResidence = async (req, res) => {
	try {
		const { search } = req.params;
		const result = await Residence.find({ name: `${search}` });
		res.status(200).json({
			status: "success",
			result,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
