const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
  industryType: {
    type: String,
    enum: [
      "LOGGING",
      "SILVICULTURE",
      "LAND_PREP_CIVIL",
      "TRUCKING",
      "HELI_LOGGING",
    ],
    default: "LOGGING",
    required: true,
    trim: true,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Document", DocumentSchema);
