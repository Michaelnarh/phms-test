const mongooose = require("mongoose");
const { Schema } = require("mongoose");

const seniourTutorSchema = mongooose.Schema({
  name: { type: String, required: [true, "Name field is required"] },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
  },
  contact: { type: String },
  zoneIds: [{ type: Schema.Types.ObjectId, ref: "Zone" }],
  mps: [{ type: Schema.Types.ObjectId, ref: "MP" }],
  nssPersonnels: [{ type: Schema.Types.ObjectId, ref: "NSSPersonnel" }],
  image: { type: String },
});

module.exports = mongooose.model("SeniorTutor", seniourTutorSchema);
