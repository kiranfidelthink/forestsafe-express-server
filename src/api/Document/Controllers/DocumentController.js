const DocumentService = require("../Services/DocumentService");

exports.createDocument = async (req, res) => {
    await DocumentService.create(req.body)
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


exports.getDocuments = async (req, res) => {
  console.log("get documents");
  await DocumentService.getAll()
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

exports.updateDocument = async (req, res) => {
  await DocumentService.update(req.params.id, req.body)
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
      console.log("errr", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.deleteDocument = async (req, res) => {
  await DocumentService.delete(req.params.id)
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
