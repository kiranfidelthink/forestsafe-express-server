const mongoose = require("mongoose");
const CrewSchema = new mongoose.Schema({
  ownerId: {
      type: mongoose.Schema.Types.ObjectId,
  },
  managerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }],
  crewName: {
    type: String,
    trim: true,
    required: true,
  },
  memberIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }],
  industryType: {
    type: String,
    required: true,
    trim: true,
  },
  dateBillingExpires: {
      type: Date,
      trim: true,
  },
  dateUpdated: {
      type: Date,
      trim: true,
      default: Date.now,
  }
});
CrewSchema.pre("save", function (next) {
  next();
});
module.exports = mongoose.model("Crews", CrewSchema);
