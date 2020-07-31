const FileService = require("../Services/FileService");
const {
  getGridFSFile,
  getGridFSFiles,
  createGridFSReadStream,
  deleteGridFSFile,
  updateGridFSFile,
} = require("../../../Database/db");

exports.createFile = async (req, res) => {
  console.log("req", req.file);
  if(!req.file){
    res.status(404).send({ message: "Error while uploading file" });
  }
  const { id } = req.file;
  await updateGridFSFile(id,{doc_id: req.params.doc_id,name: req.body.name}) 
  .then((response) => {
    if (response !== null) {
      console.log("Res", response);
        res.send(response);
    } else {
      res.status(400).send({
        message: `Can not find File with given id ${req.params.id}. File was not found!`,
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

exports.getFile = async (req, res) => {
  // Check file exist on MongoDB
  console.log("req", req.params.id);
  const file = await getGridFSFile(req.params.id);
  if (!file) {
    res.status(404).send({ message: "File not found" });
  }
  res.setHeader("content-type", file.contentType);
  const readStream = createGridFSReadStream(req.params.id);
  readStream.pipe(res);
};

exports.getFiles = async (req, res) => {
  // Check file exist on MongoDB
  console.log("req", req.params.doc_id);
 await getGridFSFiles(req.params.doc_id)
  .then((response) => {
    console.log("Res", response);
    res.send(response);
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || "Some error occurred while retrieving data.",
    });
  });
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
  await updateGridFSFile(req.params.id, req.body)
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

