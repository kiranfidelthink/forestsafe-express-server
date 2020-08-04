const CrewService = require("../Services/CrewService");
const UserService = require("../../User/Services/UserService");

exports.createCrewWithUser = async (req, res) => {
  var now = new Date();
  if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate() + 1
    );
  }
  let userData = {
    username: req.body.emailAddress,
    password: req.body.password,
    emailAddress: req.body.emailAddress,
    role: "CREW_OWNER",
    name: req.body.name,
  };
  let crew_data = {
    crewName: req.body.crewName,
    principalName: req.body.principalName,
    principalEmailAddress: req.body.principalEmailAddress,
    billingEmailAddress: req.body.billingEmailAddress,
    dateBillingExpires: current.toISOString(),
    industryType: req.body.industryType,
  };
  await UserService.create(userData)
    .then((user) => {
      crew_data.ownerId = user._id;
      return CrewService.create(crew_data).then((response) => {
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
          message: `Can not find Crew with given id ${req.params.id}. Crew was not found!`,
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
