const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const CrewController = require("../Controllers/CrewController");

router.post("/create", CrewController.createCrewWithUser);

router.get("/findAll", authentication.validateToken, CrewController.getCrews);

router.get("/:id/find", authentication.validateToken, CrewController.getCrew);

router.delete(
  "/:id/delete",
  authentication.validateToken,
  CrewController.deleteCrew
);

router.patch(
  "/:id/update",
  authentication.validateToken,
  CrewController.updateCrew
);

module.exports = router;
