const FileService = require("../Services/FileService");
exports.createFile = async (req, res) => {
    await FileService.create(req.body)
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


exports.getFiles = async (req, res) => {
  console.log("get Files");
  await FileService.getAll()
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

exports.deleteFile = async (req, res) => {
  await FileService.delete(req.params.id)
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
