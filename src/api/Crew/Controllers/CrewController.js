const CrewService = require("../Services/CrewService");
const UserService = require("../../User/Services/UserService");

exports.createCrewWithUser = async (req, res) => {
  await UserService.create(req.body.user_data)
    .then((response1) => {
      req.body.crew_data.ownerId= response1._id
      return CrewService.create(req.body.crew_data).then((response) => {
        console.log("Res ", response);
        res.send(response);
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};


exports.getCrews = async (req, res) => {
  console.log("get crews");
  await CrewService.getAll()
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

exports.getCrew = async (req, res) => {
  console.log("req", req);
  await CrewService.get(req.params.id)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find Crew with given id ${req.params.id}. Crew was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
exports.updateCrew = async (req, res) => {
  await CrewService.update(req.params.id, req.body)
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

exports.deleteCrew = async (req, res) => {
  await CrewService.delete(req.params.id)
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
