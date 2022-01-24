const Member = require("../Models/memberModel");
const Temperature = require("../Models/temperatureModel");

exports.searchMember = async (req, res) => {
  try {
    const { search } = req.body;
    const result = await Member.find({ surname: `${search}` });
    res.status(200).json({
      status: "success",
      results: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

//get all members whose temperature is greater than normal
exports.getTempGreaterThanNorm = async (req, res) => {
  try {
    const results = await Temperature.find({ temp: { $gt: 37.0 } });

    res.status(200).json({
      status: "success",
      total: results.length,
      results,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

//get all registered first service members
exports.getFirstServiceMembers = async (req, res) => {
  try {
    const results = await Member.find({ serviceType: 1 });

    res.status(200).json({
      status: "success",
      total: results.length,
      results,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

//get all registered second service members
exports.getSecondServiceMembers = async (req, res) => {
  try {
    const results = await Member.find({ serviceType: 2 });

    res.status(200).json({
      status: "success",
      total: results.length,
      results,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
