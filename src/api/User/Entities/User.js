const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  emailAddress: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["CREW_OWNER", "CREW_MANAGER", "CREW_MEMBER"],
    // default: "CREW_MEMBER",
    required:true
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  superadmin: {
    type: Boolean,
    required: true,
    default: false
  },
  crewIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crews",
    },
  ],
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});
// hash user password before saving into database
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", UserSchema);
