const FileService = require("../Services/FileService");
const {
  getGridFSFile,
  createGridFSReadStream,
  deleteGridFSFile,
} = require("../../../Database/db");

exports.createFile = async (req, res) => {
  console.log("req", req.file);
  const { originalname, mimetype, id, size } = req.file;
  res.send({ originalname, mimetype, id, size });
};

exports.getFile = async (req, res) => {
  // Check file exist on MongoDB
  console.log("req", req.params.id);
  const image = await getGridFSFile(req.params.id);
  if (!image) {
    res.status(404).send({ message: "Image not found" });
  }
  res.setHeader("content-type", image.contentType);
  const readStream = createGridFSReadStream(req.params.id);
  readStream.pipe(res);
};

exports.deleteFile = async (req, res) => {
  console.log("req", req.params.id);
  await deleteGridFSFile(req.params.id)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find Appliance with given id ${req.params.id}. Appliance was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.updateFile = async (req, res) => {
  await FileService.update(req.params.id, req.body)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find Appliance with given id ${req.params.id}. Appliance was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// app.get("/write", function (req, res) {
//   var writestream = gfs.createWriteStream({ filename: db_filename });
//   fs.createReadStream(local_file).pipe(writestream);
//   writestream.on("close", function (file) {
//     res.send("File Created : " + file.filename);
//   });
// });

// // Reading a file from MongoDB
// app.get("/read", function (req, res) {
//   // Check file exist on MongoDB
//   gfs.exist({ filename: db_filename }, function (err, file) {
//     if (err || !file) {
//       res.send("File Not Found");
//     } else {
//       var readstream = gfs.createReadStream({ filename: db_filename });
//       readstream.pipe(res);
//     }
//   });
// });

// // Delete a file from MongoDB
// app.get("/delete", function (req, res) {
//   gfs.exist({ filename: db_filename }, function (err, file) {
//     if (err || !file) {
//       res.send("File Not Found");
//     } else {
//       gfs.remove({ filename: db_filename }, function (err) {
//         if (err) res.send(err);
//         res.send("File Deleted");
//       });
//     }
//   });
// });

// // Get file information(File Meta Data) from MongoDB
// app.get("/meta", function (req, res) {
//   gfs.exist({ filename: db_filename }, function (err, file) {
//     if (err || !file) {
//       res.send("File Not Found");
//     } else {
//       gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
//         if (err) res.send(err);
//         res.send(files);
//       });
//     }
//   });
// });
