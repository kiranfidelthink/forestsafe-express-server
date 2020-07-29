const mongoose = require("mongoose");
const CrewSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  managerIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:[]
    },
  ],
  crewName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  memberIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:[]
    },
  ],
  principalName: {
    type: String,
    trim: true,
    required: true,
  },
  principalEmailAddress: {
    type: String,
    trim: true,
    required: true,
  },
  billingEmailAddress: {
    type: String,
    trim: true,
    required: true,
  },
  dateBillingExpires: {
    type: Date,
  },
  industryType: {
    type: String,
    enum: ["LOGGING", "SILVICULTURE", "LAND_PREP_CIVIL", "TRUCKING","HELI_LOGGING"],
    default: "LOGGING",
    required: true,
    trim: true,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Crew", CrewSchema);
