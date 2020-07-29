const UserService = require("../Services/UserService");

exports.createUser = async (req, res) => {
  await UserService.create(req.body)
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

exports.getUsers = async (req, res) => {
  await UserService.getAll(req.params.id)
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

exports.getUserWithToken = async (req, res) => {
  console.log("req", req.decoded);
  if (!req.decoded.username) {
    res.status(400).send({
      message: `Insufficient details.`,
    });
    return;
  }
  await UserService.getUser(req.decoded)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.getUser = async (req, res) => {
  console.log("req", req);
  await UserService.get(req.params.id)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
exports.updateUser = async (req, res) => {
  await UserService.update(req.params.id, req.body)
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

exports.deleteUser = async (req, res) => {
  await UserService.delete(req.params.id)
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
