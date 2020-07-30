const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  filePath: {
    type: Buffer,
    trim: true,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("File", FileSchema);
