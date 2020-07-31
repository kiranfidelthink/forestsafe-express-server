var mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
Grid.mongo = mongoose.mongo;
require("dotenv").config();

mongoose.set("useCreateIndex", true);
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

//Connection establishment
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var conn = mongoose.connection;

//We enebled the Listener
conn.on("error", () => {
  console.error("Error occured in db connection");
});

let gfs, gridFSBucket;

conn.on("open", () => {
  console.log("DB Connection established succesfully");
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "file_uploads",
  });
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection("file_uploads");
  console.log(
    "[!] The database connection opened successfully in GridFS service"
  );
});

// Get One File
const getGridFSFile = (id) => {
  return gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) });
};

// Get All Files
const getGridFSFiles = (doc_id) => {
  return gfs.files.find({ doc_id: doc_id }).toArray();
};

// Delete File
const deleteGridFSFile = (id) => {
  return gfs.files.remove({ _id: mongoose.Types.ObjectId(id) });
};

// Update File with Document ID while creation
const updateGridFSFile = (id, data) => {
  return gfs.files.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { returnOriginal: false }
  );
};

// Download File
const createGridFSReadStream = (id) => {
  return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
};

const storage = new GridFsStorage({
  url: process.env.DB,
  cache: true,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    console.log("file", file);
    return new Promise((resolve) => {
      console.log("db", process.env.DB);
      const fileInfo = {
        filename: file.originalname,
        bucketName: "file_uploads",
      };
      resolve(fileInfo);
    });
  },
});

storage.on("connection", () => {
  console.log("[!] Successfully accessed the GridFS database");
});

storage.on("connectionFailed", (err) => {
  console.log(err.message);
});

const upload = multer({
  storage,
});

module.exports = mongoose;
module.exports.storage = storage;
module.exports.getGridFSFile = getGridFSFile;
module.exports.getGridFSFiles = getGridFSFiles;
module.exports.createGridFSReadStream = createGridFSReadStream;
module.exports.upload = upload;
module.exports.deleteGridFSFile = deleteGridFSFile;
module.exports.updateGridFSFile = updateGridFSFile;
