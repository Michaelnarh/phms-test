const Zone = require("../Models/ZoneModel");

//create new Zone
exports.createZone = async (req, res) => {
  try {
    const newZone = await Zone.create(req.body);
    res.status(201).json({
      status: "success",
      newZone,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
